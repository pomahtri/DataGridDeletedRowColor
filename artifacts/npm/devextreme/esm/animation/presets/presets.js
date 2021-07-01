/**
* DevExtreme (esm/animation/presets/presets.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Component } from '../../core/component';
import { each } from '../../core/utils/iterator';
import { extend } from '../../core/utils/extend';
import devices from '../../core/devices';
import fx from '../fx';
var directionPostfixes = {
  forward: ' dx-forward',
  backward: ' dx-backward',
  none: ' dx-no-direction',
  undefined: ' dx-no-direction'
};
var optionPrefix = 'preset_';
var AnimationPresetCollection = Component.inherit({
  ctor: function ctor() {
    this.callBase.apply(this, arguments);
    this._registeredPresets = [];
    this.resetToDefaults();
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      defaultAnimationDuration: 400,
      defaultAnimationDelay: 0,
      defaultStaggerAnimationDuration: 300,
      defaultStaggerAnimationDelay: 40,
      defaultStaggerAnimationStartDelay: 500 // hack for better animations on ipad mini

    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device(_device) {
        return _device.phone;
      },
      options: {
        defaultStaggerAnimationDuration: 350,
        defaultStaggerAnimationDelay: 50,
        defaultStaggerAnimationStartDelay: 0
      }
    }, {
      // T254756
      device: function device() {
        return devices.current().android || devices.real.android;
      },
      options: {
        defaultAnimationDelay: 100
      }
    }]);
  },
  _getPresetOptionName: function _getPresetOptionName(animationName) {
    return optionPrefix + animationName;
  },
  // T257755
  _createAndroidSlideAnimationConfig: function _createAndroidSlideAnimationConfig(throughOpacity, widthMultiplier) {
    var that = this;

    var createBaseConfig = function createBaseConfig(configModifier) {
      return {
        type: 'slide',
        delay: configModifier.delay === undefined ? that.option('defaultAnimationDelay') : configModifier.delay,
        duration: configModifier.duration === undefined ? that.option('defaultAnimationDuration') : configModifier.duration
      };
    };

    return {
      enter: function enter($element, configModifier) {
        var width = $element.parent().width() * widthMultiplier;
        var direction = configModifier.direction;
        var config = createBaseConfig(configModifier);
        config.to = {
          left: 0,
          opacity: 1
        };

        if (direction === 'forward') {
          config.from = {
            left: width,
            opacity: throughOpacity
          };
        } else if (direction === 'backward') {
          config.from = {
            left: -width,
            opacity: throughOpacity
          };
        } else {
          config.from = {
            left: 0,
            opacity: 0
          };
        }

        return fx.createAnimation($element, config);
      },
      leave: function leave($element, configModifier) {
        var width = $element.parent().width() * widthMultiplier;
        var direction = configModifier.direction;
        var config = createBaseConfig(configModifier);
        config.from = {
          left: 0,
          opacity: 1
        };

        if (direction === 'forward') {
          config.to = {
            left: -width,
            opacity: throughOpacity
          };
        } else if (direction === 'backward') {
          config.to = {
            left: width,
            opacity: throughOpacity
          };
        } else {
          config.to = {
            left: 0,
            opacity: 0
          };
        }

        return fx.createAnimation($element, config);
      }
    };
  },
  _createOpenDoorConfig: function _createOpenDoorConfig() {
    var that = this;

    var createBaseConfig = function createBaseConfig(configModifier) {
      return {
        type: 'css',
        extraCssClasses: 'dx-opendoor-animation',
        delay: configModifier.delay === undefined ? that.option('defaultAnimationDelay') : configModifier.delay,
        duration: configModifier.duration === undefined ? that.option('defaultAnimationDuration') : configModifier.duration
      };
    };

    return {
      enter: function enter($element, configModifier) {
        var direction = configModifier.direction;
        var config = createBaseConfig(configModifier);
        config.delay = direction === 'none' ? config.delay : config.duration;
        config.from = 'dx-enter dx-opendoor-animation' + directionPostfixes[direction];
        config.to = 'dx-enter-active';
        return fx.createAnimation($element, config);
      },
      leave: function leave($element, configModifier) {
        var direction = configModifier.direction;
        var config = createBaseConfig(configModifier);
        config.from = 'dx-leave dx-opendoor-animation' + directionPostfixes[direction];
        config.to = 'dx-leave-active';
        return fx.createAnimation($element, config);
      }
    };
  },
  _createWinPopConfig: function _createWinPopConfig() {
    var that = this;
    var baseConfig = {
      type: 'css',
      extraCssClasses: 'dx-win-pop-animation',
      duration: that.option('defaultAnimationDuration')
    };
    return {
      enter: function enter($element, configModifier) {
        var config = baseConfig;
        var direction = configModifier.direction;
        config.delay = direction === 'none' ? that.option('defaultAnimationDelay') : that.option('defaultAnimationDuration') / 2;
        config.from = 'dx-enter dx-win-pop-animation' + directionPostfixes[direction];
        config.to = 'dx-enter-active';
        return fx.createAnimation($element, config);
      },
      leave: function leave($element, configModifier) {
        var config = baseConfig;
        var direction = configModifier.direction;
        config.delay = that.option('defaultAnimationDelay');
        config.from = 'dx-leave dx-win-pop-animation' + directionPostfixes[direction];
        config.to = 'dx-leave-active';
        return fx.createAnimation($element, config);
      }
    };
  },
  resetToDefaults: function resetToDefaults() {
    this.clear();
    this.registerDefaultPresets();
    this.applyChanges();
  },
  clear: function clear(name) {
    var that = this;
    var newRegisteredPresets = [];
    each(this._registeredPresets, function (index, preset) {
      if (!name || name === preset.name) {
        that.option(that._getPresetOptionName(preset.name), undefined);
      } else {
        newRegisteredPresets.push(preset);
      }
    });
    this._registeredPresets = newRegisteredPresets;
    this.applyChanges();
  },
  registerPreset: function registerPreset(name, config) {
    this._registeredPresets.push({
      name: name,
      config: config
    });
  },
  applyChanges: function applyChanges() {
    var that = this;
    var customRules = [];
    each(this._registeredPresets, function (index, preset) {
      var rule = {
        device: preset.config.device,
        options: {}
      };
      rule.options[that._getPresetOptionName(preset.name)] = preset.config.animation;
      customRules.push(rule);
    });

    this._setOptionsByDevice(customRules);
  },
  getPreset: function getPreset(name) {
    var result = name;

    while (typeof result === 'string') {
      result = this.option(this._getPresetOptionName(result));
    }

    return result;
  },
  registerDefaultPresets: function registerDefaultPresets() {
    this.registerPreset('pop', {
      animation: {
        extraCssClasses: 'dx-android-pop-animation',
        delay: this.option('defaultAnimationDelay'),
        duration: this.option('defaultAnimationDuration')
      }
    });
    this.registerPreset('openDoor', {
      animation: this._createOpenDoorConfig()
    });
    this.registerPreset('win-pop', {
      animation: this._createWinPopConfig()
    });
    this.registerPreset('fade', {
      animation: {
        extraCssClasses: 'dx-fade-animation',
        delay: this.option('defaultAnimationDelay'),
        duration: this.option('defaultAnimationDuration')
      }
    });
    this.registerPreset('slide', {
      device: function device() {
        return devices.current().android || devices.real.android;
      },
      animation: this._createAndroidSlideAnimationConfig(1, 1)
    });
    this.registerPreset('slide', {
      device: function device() {
        return !devices.current().android && !devices.real.android;
      },
      animation: {
        extraCssClasses: 'dx-slide-animation',
        delay: this.option('defaultAnimationDelay'),
        duration: this.option('defaultAnimationDuration')
      }
    });
    this.registerPreset('ios7-slide', {
      animation: {
        extraCssClasses: 'dx-ios7-slide-animation',
        delay: this.option('defaultAnimationDelay'),
        duration: this.option('defaultAnimationDuration')
      }
    });
    this.registerPreset('overflow', {
      animation: {
        extraCssClasses: 'dx-overflow-animation',
        delay: this.option('defaultAnimationDelay'),
        duration: this.option('defaultAnimationDuration')
      }
    });
    this.registerPreset('ios7-toolbar', {
      device: function device() {
        return !devices.current().android && !devices.real.android;
      },
      animation: {
        extraCssClasses: 'dx-ios7-toolbar-animation',
        delay: this.option('defaultAnimationDelay'),
        duration: this.option('defaultAnimationDuration')
      }
    });
    this.registerPreset('ios7-toolbar', {
      device: function device() {
        return devices.current().android || devices.real.android;
      },
      animation: this._createAndroidSlideAnimationConfig(0, 0.4)
    });
    this.registerPreset('stagger-fade', {
      animation: {
        extraCssClasses: 'dx-fade-animation',
        staggerDelay: this.option('defaultStaggerAnimationDelay'),
        duration: this.option('defaultStaggerAnimationDuration'),
        delay: this.option('defaultStaggerAnimationStartDelay')
      }
    });
    this.registerPreset('stagger-slide', {
      animation: {
        extraCssClasses: 'dx-slide-animation',
        staggerDelay: this.option('defaultStaggerAnimationDelay'),
        duration: this.option('defaultStaggerAnimationDuration'),
        delay: this.option('defaultStaggerAnimationStartDelay')
      }
    });
    this.registerPreset('stagger-fade-slide', {
      animation: {
        extraCssClasses: 'dx-fade-slide-animation',
        staggerDelay: this.option('defaultStaggerAnimationDelay'),
        duration: this.option('defaultStaggerAnimationDuration'),
        delay: this.option('defaultStaggerAnimationStartDelay')
      }
    });
    this.registerPreset('stagger-drop', {
      animation: {
        extraCssClasses: 'dx-drop-animation',
        staggerDelay: this.option('defaultStaggerAnimationDelay'),
        duration: this.option('defaultStaggerAnimationDuration'),
        delay: this.option('defaultStaggerAnimationStartDelay')
      }
    });
    this.registerPreset('stagger-fade-drop', {
      animation: {
        extraCssClasses: 'dx-fade-drop-animation',
        staggerDelay: this.option('defaultStaggerAnimationDelay'),
        duration: this.option('defaultStaggerAnimationDuration'),
        delay: this.option('defaultStaggerAnimationStartDelay')
      }
    });
    this.registerPreset('stagger-fade-rise', {
      animation: {
        extraCssClasses: 'dx-fade-rise-animation',
        staggerDelay: this.option('defaultStaggerAnimationDelay'),
        duration: this.option('defaultStaggerAnimationDuration'),
        delay: this.option('defaultStaggerAnimationStartDelay')
      }
    });
    this.registerPreset('stagger-3d-drop', {
      animation: {
        extraCssClasses: 'dx-3d-drop-animation',
        staggerDelay: this.option('defaultStaggerAnimationDelay'),
        duration: this.option('defaultStaggerAnimationDuration'),
        delay: this.option('defaultStaggerAnimationStartDelay')
      }
    });
    this.registerPreset('stagger-fade-zoom', {
      animation: {
        extraCssClasses: 'dx-fade-zoom-animation',
        staggerDelay: this.option('defaultStaggerAnimationDelay'),
        duration: this.option('defaultStaggerAnimationDuration'),
        delay: this.option('defaultStaggerAnimationStartDelay')
      }
    });
  }
});
var animationPresets = new AnimationPresetCollection();
export { animationPresets as presets, AnimationPresetCollection as PresetCollection };

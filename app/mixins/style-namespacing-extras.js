import Ember from 'ember';
import StyleNamespacingExtras from 'ember-component-css/mixins/style-namespacing-extras';

const {
  computed,
  Mixin,
} = Ember;

export default Mixin.create(StyleNamespacingExtras, {
  _componentIdentifier: computed({
    get() {
      return this._super().replace('-original', '');
    }
  }),
});

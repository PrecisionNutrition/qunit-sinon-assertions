'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return false;
  },

  // Make import shorter by using 'qunit-sinon-assertions'
  // rather than `'qunit-sinon-assertions/test-support'
  treeForAddonTestSupport(tree) {
    const namespacedTree = new Funnel(tree, {
      srcDir: '/',
      destDir: `/${this.moduleName()}`,
      annotation: `Addon#treeForTestSupport (${this.name})`,
    });

    return this.preprocessJs(namespacedTree, '/', this.name, {
      registry: this.registry,
    });
  },
};

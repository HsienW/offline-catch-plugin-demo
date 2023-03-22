const _ = require('lodash');
const JSZip = require('jszip');
const mime = require('mime-types');
const RawSource = require('webpack-sources').RawSource;

const zip = new JSZip();

const OfflineCatchPlugin = function (options) {
    this.options = _.assign(
        {
            packageNameKey: 'packageName',
            packageNameValue: '',
            version: 1,
            folderName: 'package',
            indexFileName: 'index.json',
            baseUrl: '',
            fileTypes: [],
            excludeFileName: [],
            transformExtensions: /^(gz|map)$/i,
            serialize: (manifest) => {
                return JSON.stringify(manifest, null, 2);
            }
        },
        options
    );
}

OfflineCatchPlugin.prototype.apply = function (compiler) {
    compiler.hooks.emit.tapAsync(
        'OfflineCatchPlugin',
        (compilation, callback) => {
            console.log('========== OfflineCatchPlugin ==========');
            console.log(compilation);
            callback();
        }
    );
}

module.exports = OfflineCatchPlugin;

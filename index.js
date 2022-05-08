// standard-version-updater.js
const pluginInfoRegex = /^\s*(<\?php\s*\/\*.*\*\/)/is;
const pluginInfoVersionRegex = /(version\s*:\s*)([a-zA-Z0-9_.-]*)(\s*)$/im;
const findRegexMatch = (regex, contents, groupIndex) => {
    let m;
    let result = null;
    if ((m = regex.exec(contents)) !== null) {
        m.forEach((match, index) => {
            if (index === groupIndex) {
                result = match;
            }
        });
    }
    return result;
};
module.exports.readVersion = function (contents) {
    const result = findRegexMatch(pluginInfoRegex, contents, 1);
    if (result) {
        return findRegexMatch(pluginInfoVersionRegex, result, 2);
    }
    return null;
};

module.exports.writeVersion = function (contents, version) {
    const result = findRegexMatch(pluginInfoRegex, contents, 1);
    if (result) {
        contents = contents.replace(
            pluginInfoRegex,
            result.replace(pluginInfoVersionRegex, `$1${version}$3`)
        );
    }
    return contents;
};

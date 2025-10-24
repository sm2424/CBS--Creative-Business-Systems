/* 
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/forms');
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/pdf');

  // Shortcode for displaying current year
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
}; */

/* 24-102-2025 */
const htmlmin = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const Terser = require('terser');

module.exports = function (eleventyConfig) {
  /* ----------------------------
   * ✅ PASSTHROUGH FILES
   * ---------------------------- */
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/forms');
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/pdf');
  eleventyConfig.addPassthroughCopy('src/admin');

  /* ----------------------------
   * ✅ MINIFY INLINE CSS
   * ---------------------------- */
  eleventyConfig.addFilter('cssmin', (code) => {
    return new CleanCSS({}).minify(code).styles;
  });

  /* ----------------------------
   * ✅ MINIFY INLINE JS
   * ---------------------------- */
  eleventyConfig.addFilter('jsmin', (code) => {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error:', minified.error);
      return code;
    }
    return minified.code;
  });

  /* ----------------------------
   * ✅ MINIFY HTML OUTPUT
   * ---------------------------- */
  eleventyConfig.addTransform('htmlmin', async (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      return await htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      });
    }
    return content;
  });

  /* ----------------------------
   * ✅ SHORTCODE: Current Year
   * ---------------------------- */
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};

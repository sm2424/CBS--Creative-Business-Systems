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
const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
  /* ----------------------------
   * ✅ PASSTHROUGH FILES
   * ---------------------------- */
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/forms');
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/pdf');

  /* ----------------------------
   * ✅ IMAGE OPTIMIZATION (async)
   * ---------------------------- */
  eleventyConfig.addShortcode('image', async (src, alt, cls = '') => {
    let metadata = await Image(src, {
      widths: [300, 600, 1200],
      formats: ['webp', 'jpeg'],
      urlPath: '/assets/optimized/',
      outputDir: './public/assets/optimized/',
    });

    let imageAttributes = {
      alt,
      class: cls,
      loading: 'lazy',
      decoding: 'async',
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  /* ----------------------------
   * ✅ MINIFY INLINE CSS
   * ---------------------------- */
  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  /* ----------------------------
   * ✅ MINIFY INLINE JS
   * ---------------------------- */
  eleventyConfig.addFilter('jsmin', function (code) {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  /* ----------------------------
   * ✅ MINIFY HTML OUTPUT
   * ---------------------------- */
  eleventyConfig.addTransform('htmlmin', async function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = await htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      });
      return minified;
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

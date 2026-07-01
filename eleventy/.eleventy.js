'use strict';

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('uploads');

  // All equipment items, available only, sorted by name
  eleventyConfig.addCollection('equipment', api =>
    api.getFilteredByGlob('content/equipment/*.md')
       .filter(i => i.data.available !== false)
       .sort((a, b) => (a.data.name || '').localeCompare(b.data.name || ''))
  );

  // Filter collection by category id
  eleventyConfig.addFilter('byCat', (items, cat) =>
    (items || []).filter(i => i.data.category === cat)
  );

  // Count items in a category
  eleventyConfig.addFilter('catCount', (items, cat) =>
    (items || []).filter(i => i.data.category === cat).length
  );

  // Unique subcategory names for a category (order of first appearance)
  eleventyConfig.addFilter('subcats', (items, cat) => {
    const seen = new Set();
    (items || [])
      .filter(i => i.data.category === cat)
      .forEach(i => seen.add(i.data.subcategory));
    return [...seen];
  });

  // Filter by subcategory name
  eleventyConfig.addFilter('bySub', (items, sub) =>
    (items || []).filter(i => i.data.subcategory === sub)
  );

  // Find a single category object by id
  eleventyConfig.addFilter('findCat', (cats, id) =>
    (cats || []).find(c => c.id === id) || { id, name: id, desc: '' }
  );

  // Zero-pad a number to two digits
  eleventyConfig.addFilter('pad2', n => String(n).padStart(2, '0'));

  // Truncate text
  eleventyConfig.addFilter('truncate', (str, len) => {
    if (!str || str.length <= len) return str || '';
    return str.slice(0, len).replace(/\s+\S*$/, '') + '…';
  });

  return {
    dir: { input: '.', output: '_site', includes: '_includes' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['md', 'njk'],
  };
};

module.exports = {
  layout: 'equipment-item.njk',
  tags: ['equipment'],
  available: true,
  permalink: (data) => `/equipment/item/${data.page.fileSlug}/`,
};

it('should filter stories', () => {
  component.search = 'Angular';
  component.onSearch();
  expect(component.page).toBe(1);
});

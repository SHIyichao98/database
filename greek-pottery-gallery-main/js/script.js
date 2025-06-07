fetch('data.json')
  .then(response => response.json())
  .then(fullJson => {
    const tableEntry = fullJson.find(entry => entry.type === "table" && entry.name === "pottery");
    const data = tableEntry?.data || [];

    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('filter-all');

    function render(items) {
      gallery.innerHTML = "";
      items.forEach(item => {
      const container = document.createElement('div');
      container.className = 'card';  // 必须有这行！
      container.innerHTML = `
      <img src="images/${item.filename}" alt="${item.shape}">
      <p><strong>Shape:</strong> ${item.shape}</p>
      <p><strong>Size:</strong> ${item.size}</p>
      <p><strong>Material:</strong> ${item.material}</p>
      <p><strong>Origin Site:</strong> ${item.origin_site}</p>
      <p><strong>Usage:</strong> ${item.usage_description}</p>
      `;
      gallery.appendChild(container);

      });

      if (items.length === 0) {
        gallery.innerHTML = "<p>No matching records found.</p>";
      }
    }

    render(data);

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();

        const filtered = data.filter(item => {
          return (
            item.shape?.toLowerCase().includes(keyword) ||
            item.size?.toLowerCase().includes(keyword) ||
            item.material?.toLowerCase().includes(keyword) ||
            item.origin_site?.toLowerCase().includes(keyword) ||
            item.usage_description?.toLowerCase().includes(keyword)
          );
        });

        render(filtered);
      });
    }
  })
  .catch(error => {
    console.error("❌ Failed to load or parse data.json:", error);
    document.getElementById('gallery').innerHTML = "❌ Failed to load gallery data.";
  });







function renderLiveMetadata(meta) {
    const table = document.getElementById("item-attributes");
    table.innerHTML = "";

    Object.entries(meta).forEach(([key, value]) => {
        const row = document.createElement("tr");
        row.innerHTML = `<th>${key}</th><td>${value}</td>`;
        table.appendChild(row);
    });

    if (meta.artwork) {
        document.getElementById("item-image").src = meta.artwork;
    }
}

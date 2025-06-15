export async function load(component) {
    const response = await fetch(`/components/${component}.html`);
    const content = await response.text();

    document.body.innerHTML += content;
}
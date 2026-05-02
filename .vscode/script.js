const html = document.documentElement
const themeToggleBtn = document.getElementById("theme-toggle")

// NOVO: Capturando a imagem de perfil lá do HTML
const profileImg = document.querySelector("#profile img")

// ==========================================
// 1. LÓGICA DE TROCA DE TEMA E IMAGEM
// ==========================================
const currentTheme = localStorage.getItem("theme")

// Verifica ao carregar a página se o tema salvo era o claro
if (currentTheme === "light") {
  html.classList.add("light")
  // Já carrega a imagem clara caso o tema salvo seja light
  profileImg.setAttribute("src", "./assets/avatar-light.png")
}

// O que acontece quando o botão é clicado:
themeToggleBtn.addEventListener("click", () => {
  html.classList.toggle("light")

  if (html.classList.contains("light")) {
    // Salvou no navegador como light
    localStorage.setItem("theme", "light")
    // Troca a imagem para a versão light
    profileImg.setAttribute("src", "./assets/avatar-light.png")
  } else {
    // Salvou no navegador como dark
    localStorage.setItem("theme", "dark")
    // Volta para a imagem normal (dark)
    profileImg.setAttribute("src", "./assets/avatar.png")
  }
})

// ==========================================
// 2. LÓGICA DO BOTÃO DE COMPARTILHAR
// ==========================================
const shareBtn = document.getElementById("share-btn")
const toast = document.getElementById("toast")

shareBtn.addEventListener("click", () => {
  const profileUrl = window.location.href

  navigator.clipboard
    .writeText(profileUrl)
    .then(() => {
      toast.classList.add("show")

      setTimeout(() => {
        toast.classList.remove("show")
      }, 3000)
    })
    .catch((err) => {
      console.error("Falha ao copiar o link: ", err)
      alert("Erro ao copiar o link. Tente manualmente!")
    })
})

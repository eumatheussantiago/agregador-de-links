"use strict"

// ==========================================
// 1. DICIONÁRIO DE TRADUÇÃO (PT / EN)
// ==========================================
const translations = {
  pt: {
    bio: "🚀 Full Stack Developer | Apaixonado por tecnologia e motivado pelo desafio de transformar ideias em soluções reais por meio da Engenharia de Software e da Inteligência Artificial.",
    link1_title: "Contrate meus Serviços",
    link1_desc: "Desenvolvimento web sob medida",
    link2_title: "Conheça a Rocketseat",
    link2_desc: "Evolua sua carreira na programação",
    link3_title: "Ver meu portfólio",
    link3_desc: "Meus repositórios e projetos",
    link4_title: "Cripto na CoinBase",
    link4_desc: "Abra sua conta e ganhe R$15 em BTC",
    toast_msg: "Link copiado para a área de transferência!",
  },
  en: {
    bio: "🚀 Full Stack Developer | Passionate about technology and motivated by the challenge of turning ideas into real solutions through Software Engineering and AI.",
    link1_title: "Hire my Services",
    link1_desc: "Custom web development",
    link2_title: "Discover Rocketseat",
    link2_desc: "Evolve your programming career",
    link3_title: "View my portfolio",
    link3_desc: "My repositories and projects",
    link4_title: "Crypto on CoinBase",
    link4_desc: "Open an account and get $3 in BTC",
    toast_msg: "Link copied to clipboard!",
  },
}

// ==========================================
// 2. REFERÊNCIAS DO DOM (Para Performance)
// ==========================================
const html = document.documentElement
const themeToggleBtn = document.getElementById("theme-toggle")
const profileImg = document.getElementById("profile-img")
const shareBtn = document.getElementById("share-btn")
const toast = document.getElementById("toast")
const langButtons = document.querySelectorAll(".lang-btn")
const i18nElements = document.querySelectorAll(".i18n")

// ==========================================
// 3. LÓGICA DE IDIOMA (Segura e sem inline JS)
// ==========================================
function changeLang(lang) {
  if (!translations[lang]) return

  // Atualiza estado visual e de acessibilidade dos botões
  langButtons.forEach((btn) => {
    const isSelected = btn.getAttribute("data-lang") === lang
    btn.classList.toggle("active", isSelected)
    btn.setAttribute("aria-pressed", isSelected)
  })

  // Aplica as traduções baseadas no atributo data-key
  i18nElements.forEach((el) => {
    const key = el.getAttribute("data-key")
    if (key && translations[lang][key]) {
      el.textContent = translations[lang][key]
    }
  })

  // Salva preferência com tratamento de erro (caso cookies bloqueados)
  try {
    localStorage.setItem("lang", lang)
  } catch (e) {
    console.warn("LocalStorage não disponível.")
  }
}

// Vincula o evento de clique aos botões de idioma dinamicamente
langButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const selectedLang = e.target.getAttribute("data-lang")
    if (selectedLang) changeLang(selectedLang)
  })
})

// Inicialização segura de idioma
const savedLang = (() => {
  try {
    return localStorage.getItem("lang") || "pt"
  } catch (e) {
    return "pt"
  }
})()
changeLang(savedLang)

// ==========================================
// 4. LÓGICA DE TEMA (Dark/Light com a11y)
// ==========================================
const initTheme = () => {
  try {
    const currentTheme = localStorage.getItem("theme")
    if (currentTheme === "light") {
      html.classList.add("light")
      if (themeToggleBtn) themeToggleBtn.setAttribute("aria-pressed", "true")
      if (profileImg) profileImg.src = "./assets/avatar-light.png"
    }
  } catch (e) {
    console.warn("LocalStorage não disponível para tema.")
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isLight = html.classList.toggle("light")

    // Atualiza Acessibilidade
    themeToggleBtn.setAttribute("aria-pressed", isLight)

    // Atualiza Imagem e Storage
    if (profileImg)
      profileImg.src = isLight
        ? "./assets/avatar-light.png"
        : "./assets/avatar.png"

    try {
      localStorage.setItem("theme", isLight ? "light" : "dark")
    } catch (e) {}
  })
}

initTheme()

// ==========================================
// 5. LÓGICA DO BOTÃO DE COMPARTILHAR
// ==========================================
let toastTimeout

if (shareBtn && toast) {
  shareBtn.addEventListener("click", async () => {
    const profileUrl = window.location.href

    try {
      // Uso da API moderna do clipboard
      await navigator.clipboard.writeText(profileUrl)

      // Reseta a animação se for clicado várias vezes rapidamente
      clearTimeout(toastTimeout)
      toast.classList.add("show")

      toastTimeout = setTimeout(() => {
        toast.classList.remove("show")
      }, 3000)
    } catch (err) {
      console.error(
        "Erro ao copiar o link. Permissões podem estar bloqueadas.",
        err,
      )
    }
  })
}

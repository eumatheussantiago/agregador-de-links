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
// 2. LÓGICA DE IDIOMA
// ==========================================
function changeLang(lang) {
  // Remove classe ativa de todos e adiciona no botão clicado
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => btn.classList.remove("active"))
  document.getElementById(`btn-${lang}`).classList.add("active")

  // Traduz todos os elementos com a classe .i18n
  document.querySelectorAll(".i18n").forEach((el) => {
    const key = el.getAttribute("data-key")
    if (translations[lang][key]) {
      el.textContent = translations[lang][key]
    }
  })

  // Salva no navegador do utilizador
  localStorage.setItem("lang", lang)
}

// Ao abrir o site, verifica a língua guardada
const savedLang = localStorage.getItem("lang") || "pt"
changeLang(savedLang)

// ==========================================
// 3. LÓGICA DE TROCA DE TEMA E IMAGEM
// ==========================================
const html = document.documentElement
const themeToggleBtn = document.getElementById("theme-toggle")
const profileImg = document.getElementById("profile-img")
const currentTheme = localStorage.getItem("theme")

// Verifica ao carregar a página se o tema salvo era o claro
if (currentTheme === "light") {
  html.classList.add("light")
  profileImg.setAttribute("src", "./assets/avatar-light.png")
}

// Quando o botão de tema é clicado:
themeToggleBtn.addEventListener("click", () => {
  html.classList.toggle("light")

  if (html.classList.contains("light")) {
    localStorage.setItem("theme", "light")
    profileImg.setAttribute("src", "./assets/avatar-light.png")
  } else {
    localStorage.setItem("theme", "dark")
    profileImg.setAttribute("src", "./assets/avatar.png")
  }
})

// ==========================================
// 4. LÓGICA DO BOTÃO DE COMPARTILHAR (TOAST)
// ==========================================
const shareBtn = document.getElementById("share-btn")
const toast = document.getElementById("toast")

shareBtn.addEventListener("click", () => {
  const profileUrl = window.location.href

  navigator.clipboard
    .writeText(profileUrl)
    .then(() => {
      toast.classList.add("show")

      // Esconde a notificação depois de 3 segundos
      setTimeout(() => {
        toast.classList.remove("show")
      }, 3000)
    })
    .catch((err) => {
      console.error("Erro ao copiar o link: ", err)
    })
})

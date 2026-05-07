document.getElementById("formulario").addEventListener("submit", async function(event) {
  event.preventDefault();

  const botao = document.querySelector(".btn-secondary");
  const textoOriginalBotao = botao.textContent;

  botao.disabled = true;
  botao.textContent = "Enviando...";

  const nome = document.querySelector('[name="nome_empresa"]').value.trim();
  const email = document.querySelector('[name="email"]').value.trim();
  const telefone = document.querySelector('[name="telefone"]').value.trim();
  const cidade = document.querySelector('[name="cidade"]').value.trim();

  const trafegoPago = Array.from(document.querySelectorAll('[name="trafego_pago"]:checked'))
    .map(item => item.value)
    .join(", ") || "Não informado";

  const canais = Array.from(document.querySelectorAll('[name="canais"]:checked'))
    .map(item => item.value)
    .join(", ") || "Não informado";

  const mensagem = `Olá! Quero solicitar uma análise do meu negócio.

Nome / Empresa: ${nome}
E-mail: ${email}
Telefone: ${telefone}
Cidade: ${cidade || "Não informado"}

Utiliza tráfego pago: ${trafegoPago}

Canais atuais: ${canais}`;

  const numeroWhatsApp = "5517996465741";
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  const urlGoogleSheets = "https://script.google.com/macros/s/AKfycbxxMyroRDyo6q7mjL2-eVXJBdKWa5jk0rO4ZNnWsOM2XaDr1TCqEh2dPxgr7KHBH4P96w/exec";

  const dados = new URLSearchParams();
  dados.append("nome", nome);
  dados.append("email", email);
  dados.append("telefone", telefone);
  dados.append("cidade", cidade || "Não informado");
  dados.append("trafegoPago", trafegoPago);
  dados.append("canais", canais);

  try {
    await fetch(urlGoogleSheets, {
      method: "POST",
      mode: "no-cors",
      body: dados
    });

    window.location.href = urlWhatsApp;

  } catch (erro) {
    console.error("Erro ao salvar no Google Sheets:", erro);

    // Mesmo se der erro no Sheets, ainda manda para o WhatsApp
    window.location.href = urlWhatsApp;
  }
});
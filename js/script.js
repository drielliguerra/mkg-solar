document.getElementById("leadForm").addEventListener("submit", function(event) {
  event.preventDefault();

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

  const numeroWhatsApp = "5513996465741";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.location.href = url;
});
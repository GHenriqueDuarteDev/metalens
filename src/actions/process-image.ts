"use server";

export async function processImageAction(formData: FormData) {
  // Extrai o arquivo do FormData (front deve enviar com o nome 'image')
  const file = formData.get("image") as File | null;

  if (!file) {
    return { error: "Nenhuma imagem foi recebida pelo servidor." };
  }

  // --- TESTE DE FUNCIONAMENTO ---
  // Deve bater no terminal com as seguintes informações abaixo
  console.log("🚀 --- NOVO UPLOAD RECEBIDO ---");
  console.log("Nome:", file.name);
  console.log("Tipo:", file.type);
  console.log("Tamanho:", (file.size / 1024 / 1024).toFixed(2), "MB");
  console.log("------------------------------");

  // Simulando o tempo de leitura do banco e da extração forense (1.5 segundos)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Retornamos um ID falso para testar o redirecionamento ou mensagens de sucesso
  return { success: true, fakeId: "12345-abcde" };
}

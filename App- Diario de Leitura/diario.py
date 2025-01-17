import tkinter as tk
from tkinter import messagebox, filedialog
from ttkbootstrap import Style
from datetime import datetime

# Função para salvar o resumo em um arquivo de texto
def salvar_resumo():
    # Coleta os dados dos campos
    livro = livro_entry.get()
    autor = autor_entry.get()
    capitulo = capitulo_entry.get()
    pagina = pagina_entry.get()
    data = data_entry.get()
    resumo = resumo_text.get("1.0", tk.END)

    if not livro or not autor or not capitulo or not pagina or not data or not resumo.strip():
        messagebox.showwarning("Campos vazios", "Todos os campos devem ser preenchidos.")
        return

    # Formata os dados
    conteudo = (f"Livro: {livro}\nAutor: {autor}\nCapítulo: {capitulo}\n"
                f"Página: {pagina}\nData: {data}\nResumo:\n{resumo}\n{'='*40}\n")

    # Pede ao usuário um local para salvar o arquivo
    file_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text files", "*.txt")])
    if not file_path:
        return

    # Salva o conteúdo no arquivo
    try:
        with open(file_path, "a") as file:
            file.write(conteudo)
        messagebox.showinfo("Salvo", "Resumo salvo com sucesso!")
    except Exception as e:
        messagebox.showerror("Erro", f"Erro ao salvar o arquivo: {e}")

# Configuração da janela principal com ttkbootstrap
style = Style(theme="superhero")  # Estilo moderno do ttkbootstrap
root = style.master
root.title("Diário de Leituras")
root.geometry("450x550")

# Label e Entry para o nome do livro
tk.Label(root, text="Livro", font=("Helvetica", 10, "bold")).pack(pady=5)
livro_entry = tk.Entry(root, width=50)
livro_entry.pack()

# Label e Entry para o autor do livro
tk.Label(root, text="Autor", font=("Helvetica", 10, "bold")).pack(pady=5)
autor_entry = tk.Entry(root, width=50)
autor_entry.pack()

# Label e Entry para o capítulo
tk.Label(root, text="Capítulo", font=("Helvetica", 10, "bold")).pack(pady=5)
capitulo_entry = tk.Entry(root, width=50)
capitulo_entry.pack()

# Label e Entry para a página
tk.Label(root, text="Página", font=("Helvetica", 10, "bold")).pack(pady=5)
pagina_entry = tk.Entry(root, width=50)
pagina_entry.pack()

# Label e Entry para a data (formato DD/MM/AAAA)
tk.Label(root, text="Data (DD/MM/AAAA)", font=("Helvetica", 10, "bold")).pack(pady=5)
data_entry = tk.Entry(root, width=50)
data_entry.insert(0, datetime.now().strftime("%d/%m/%Y"))  # Data atual por padrão
data_entry.pack()

# Label e Text para o resumo
tk.Label(root, text="Resumo", font=("Helvetica", 10, "bold")).pack(pady=5)
resumo_text = tk.Text(root, width=50, height=10)
resumo_text.pack()

# Botão para salvar o resumo com estilo bootstrap
salvar_button = tk.Button(root, text="Salvar Resumo", command=salvar_resumo, bg="#4CAF50", fg="white")
salvar_button.pack(pady=20)

# Executa a aplicação
root.mainloop()

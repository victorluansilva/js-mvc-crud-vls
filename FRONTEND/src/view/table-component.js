const tableComponent = {
  render: () => {
    const root = document.getElementById("root");
    const tableResult = document.createElement("table");
    tableResult.setAttribute("id", "resultTable");
    tableResult.className = "table table-borderless table-hover";
    tableResult.innerHTML = `
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Idade</th>
              <th scope="col">Login</th>
              <th scope="col">Senha</th>
            </tr>
        </thead>
        <tbody id="users-result">
       
        </tbody>
    `;
    root.appendChild(tableResult);
  },
  update: (params) => {
    const tRBody = document.getElementById("users-result");
    tRBody.innerHTML = ``;
    for (let i = 0; i < params.length; i++) {
      const newLine = document.createElement("tr");
      newLine.className = "row-line";
      newLine.setAttribute("id", `user${i}`);
      newLine.innerHTML = `
        <th scope="row">#${i + 1}</th>            
        <td class="text-success"><strong ><b>${params[
          i
        ].getNome()}</b></strong></td>            
        <td><strong>${params[i].getIdade()}</strong></td>            
        <td><b class="text-info"><i>${params[
          i
        ].getLogin()}</b></i></td>            
        <td><input class="form-control" type="password" value="${params[
          i
        ].getSenha()}" disabled style="border: none !important;
        border-color: transparent !important;"></td>                    
      `;
      tRBody.appendChild(newLine);
    }
  },
};
export { tableComponent };

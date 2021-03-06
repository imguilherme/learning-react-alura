import React, { Component } from "react";
import $ from "jquery";
import InputCustomizado from "./componentes/InputCustomizado";

class FormularioAutor extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      senha: ""
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.setNome = this.setNome.bind(this);
  }

  enviaForm(event) {
    event.preventDefault();
    console.log("dados enviados");
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      contentType: "application/json",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha
      }),
      success: resposta => {
        this.props.callbackAtualizaListagem(resposta);
        this.setState(...this.state, { nome: "", email: "", senha: "" });
      },
      error: resposta => {
        console.log("erro");
      }
    });
  }

  setNome(event) {
    this.setState({ nome: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setSenha(event) {
    this.setState({ senha: event.target.value });
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form
          className="pure-form pure-form-aligned"
          method="post"
          onSubmit={this.enviaForm}
        >
          <InputCustomizado
            label="Nome"
            id="nome"
            type="text"
            name="nome"
            value={this.state.nome}
            onChange={this.setNome}
          />
          <InputCustomizado
            label="Email"
            id="email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.setEmail}
          />
          <InputCustomizado
            label="Senha"
            id="senha"
            type="password"
            name="senha"
            value={this.state.senha}
            onChange={this.setSenha}
          />
          <div className="pure-control-group">
            <label />
            <button type="submit" className="pure-button pure-button-primary">
              Gravar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

class TabelaAutores extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lista.map(autor => {
              return (
                <tr key={autor.id}>
                  <td>{autor.nome}</td>
                  <td>{autor.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default class AutorBox extends Component {
  constructor() {
    super();
    this.state = { lista: [] };
    this.atualizaLista = this.atualizaLista.bind(this);
  }

  // é chamada após o render
  componentDidMount() {
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      dataType: "json",
      success: resposta => {
        this.setState({ lista: resposta });
      }
    });
  }

  atualizaLista(novaLista) {
    this.setState({ lista: novaLista });
  }

  render() {
    return (
      <div>
        <FormularioAutor callbackAtualizaListagem={this.atualizaLista} />
        <TabelaAutores lista={this.state.lista} />
      </div>
    );
  }
}

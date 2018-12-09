---
title: "Gitkraken - Principais Funções"
date: 2018-11-24
tags: [dev-u, git, github, gitkraken]
author: Hugo Borges
header:
    image: "/images/devu_banner.jpg"
excerpt: Dev-U, Git, Github, Gitkraken" 
---

Aqui mostrarei os principais comandos e funções do **Git** através do **Gitkraken**. Focarei em como resolver problemas específicos que costumamos encontrar quando trabalhando com a **Unity** em conjunto com o **Git**.
{: .text-justify}

Material auxiliar da própria Dev-U sobre Git: [**link**](https://drive.google.com/open?id=17EWH_fP3Ke4JDRstbJqLpBxFM-AaFR8k8B2GsCJ4_1I)
{: .text-justify}


## **Links Rápidos**
* <A href="#criando-um-repositório">Criando um Repositório</A>
    * <A href="#principais-branches">Principais Branches</A>
    * <A href="#definindo-regras-nas-branches">Definindo regras nas Branches</A>
    * <A href="#convidando-usuários-para-o-repositório">Convidando usuários para o Repositório</A>

* <A href="#clonando-um-projeto">Clonando um Projeto</A>
* <A href="#abrindo-um-projeto-já-clonado">Abrindo um Projeto já clonado</A>
* <A href="#criando-uma-nova-branch">Criando uma nova Branch</A>
    * <A href="#boas-práticas-e-padrões-1">Boas Práticas e Padrões</A>

* <A href="#enviando-commits">Enviando Commits</A>
    * <A href="#boas-práticas-e-padrões-2">Boas Práticas e Padrões</A>
    * <A href="#amend---alterando-seu-último-commit">Amend - Alterando seu último commit </A>
    * <A href="#stash---guardando-alterações-para-mais-tarde">Stash - Guardando alterações para mais tarde </A>
    * <A href="#rebase---alterando-commits-antigos">Rebase - Alterando Commits Antigos</A>
    
* <A href="#criando-pull-requests">Criando Pull-Requests</A>
    * <A href="#boas-práticas-e-padrões-3">Boas Práticas e Padrões</A>
    * <A href="#tratando-conflitos---separando-crianças-de-adultos">Tratando Conflitos - Separando crianças de adultos</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}
# Criando um Repositório

Para criar um repositório, primeiro entre no [**GitHub**](https://www.github.com) com sua conta.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_login_page.JPG" alt="Github Login Page">{: .center-image }

Após entrar com sua conta, na tela inicial serão exibidos todos os seus repositórios. Junto a eles, um botão para criar um novo repositório.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_first_page.JPG" alt="Github First Page">{: .center-image }

A tela para criação de um novo repositório será como a seguinte:
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_new_repository.JPG" alt="Github New Repository">{: .center-image }

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}
## Principais Branches

Em nossos projetos, costumamos seguir algumas convenções de nomes para as *Branches*, de modo a manter a organização e para todos os membros consigam interagir em todos repositórios.
{: .text-justify}

Geralmente, um projeto inicia-se com **3 Branches**:
{: .text-justify}
1. Develop
2. Pre-Release
3. Release

Logo após a criação do repositório, só existirá a *branch* **Master**, sendo possível criar novas *branches* pelo menu onde é exibido os nomes das *branches*
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_repository_page.JPG" alt="Github Repository Page">{: .center-image }


<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_create_branch.JPG" alt="Github Create Branch">{: .center-image }


<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_branches_created.JPG" alt="Github Branches Created">{: .center-image }


Após criadas as *branches*, como mostrado na imagem acima, é necessário setar a *branch* **Develop** como a nossa nova *branch* principal de desenvolvimento, e também é necessário deletar a *branch* **Master**.
{: .text-justify}


Primeiro, para setar a branch **Develop** como a nova padrão, entre nas Configurações do repositório, em **Settings**, e depois no menu lateral **Branches**. Na tela que aparecerá será possível alterar a *branch* principal do repositório.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_default_branch.JPG" alt="Github Default Branch">{: .center-image }

Para deletar a branch **Master**, basta entrar em **Code/branches** e deletar a branch **Master**.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_delete_master.JPG" alt="Github Delete Master">{: .center-image }

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

## Definindo regras nas Branches

Caso o projeto em que deseja trabalhar tenha mais de 1 contribuidor, é interessante impedir que os seus usuários enviem *commits* diretamente para as **3 branches** principais, precisando passarem pela avaliação de um *Pull-Request*. Para isso, é necessário configurar algumas regras para as *branches*.
{: .text-justify}

Novamente no menu **Settings/Branches**, desta vez utilizaremos a opção **Add Rule**.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_add_rule.JPG" alt="Github Add Rule">{: .center-image }

 No caso, colocaremos a regra de que será necessário pelo menos 1 *review* através do Pull-Request para que o código seja aprovado para a *Branch*. Faça o procedimento abaixo para as branches **Develop**, **Pre-Release** e **Release**.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_add_rule_2.JPG" alt="Github Add Rule2">{: .center-image }

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

## Convidando usuários para o Repositório

Para adicionar um usuário do *GitHub* como colaborador, você deverá entrar no menu **Settings/Collaborators**. Então é só pesquisar pelo usuário.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_add_collaborator.JPG" alt="Github Add Collaborator">{: .center-image }

Após adicionado, o usuário cadastrado receberá uma notificação de convite para contribuir ao repositório. Caso deseje, o link de convite gerado por ser copiado na mesma tela, para que seja enviado manualmente para o usuário.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_add_collaborator_link.JPG" alt="Github Add Collaborator Link">{: .center-image }


* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

# Clonando um Projeto

Para clonar um projeto pelo *Gitkraken*, você deve seguir as seguintes opções:
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_clone.JPG" alt="GitKraken Clone">{: .center-image }

O mesmo pode ser obtido pelo comando: 
{: .text-justify}

```bash
git clone https://github.com/dev-u/emburradinho_prototipo.git
```


* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

# Abrindo um Projeto já clonado

Para abrir um projeto já clonado pelo *GitKraken*,
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_open.JPG" alt="GitKraken Open">{: .center-image }

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

# Criando uma nova Branch

Pelo GitKraken:
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_branch.JPG" alt="GitKraken Branch">{: .center-image }

Pela linha de comando 
{: .text-justify}

```bash
git checkout -b nome_da_branch
```


* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

## Boas Práticas e Padrões 1

O primeiro ponto a levar em consideração quando se fala de padrões é a nomenclatura.
O padrão incorporado pela *Dev-U* é o padrão usando em empresas.
{: .text-justify}

* **feature/nome_da_feature** --> Nome de *branches* para novas *features* desenvolvidas;
* **imp/nome_da_melhoria** --> IMP vem de *improvement*, onde essa *branch* seria focado na melhoria de alguma *feature* existente;
* **fix/nome_do_fix** --> *Branches* dedicadas à correção de *BUGs*;

Outro ponto{: .text-justify}
 importante, fugindo de padrões e indo mais para o que é certo, é **de onde** uma branch deve ser criada.

Resumidamente, todas as novas *branches* deverão ser criadas a partir da *branch* **DEVELOP**.
{: .text-justify}


* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

# Enviando Commits

Quando algum arquivo for criado\removido ou modificado na pasta do projeto, o *Gitkraken* manterá uma notificação de arquivos modificados.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_changes.JPG" alt="GitKraken Changes">{: .center-image }

Ao clicar em *View Changes*, será aberto um menu para seleção do quais itens deverão ir de **Unstaged** para **Staged**:
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_staged.JPG" alt="GitKraken Staged">{: .center-image }

* No menu lateral de *Commit*, em **Unstaged** são listados os arquivos que foram modificados, desde o último *Commit*;
* Em **Staged** serão colocados os arquivos que entrarão no próximo *Commit*.
{: .text-justify}

É importante tomar cuidado para que apenas os arquivos que realmente farão parte do *commit* entrem no *commit*. Não só os arquivos, mas também devem entrar no próximo *commit* **SOMENTE** as linhas que **fazendo sentido** entrar no Commit.
{: .text-justify}

A tela de *commit* com a visualização das linhas pode ser visto na imagem abaixo.
{: .text-justify}

### Como fazer o mesmo procedimento pela linha de comando

Para visualizar quais arquivos foram modificados desde o último *commit*, poderá ser utilizada a ferramenta **TIG**:
{: .text-justify}

```bash
tig
```

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/bash_tig.JPG" alt="Bash TIG">{: .center-image }

Caso existam dúvidas sobre como se movimentar no ambiente *VIM* utilizado pelo **TIG**, siga [**este link.**](http://blog.locaweb.com.br/geral/tig-client-para-git-no-terminal/)
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_branch.JPG" alt="GitKraken Branch">{: .center-image }


Vistas as alterações, pela própria ferramenta **TIG** é possível selecionar e adicionar linhas e\ou arquivos de **UNSTAGED** para **STAGED** para o próximo *commit*.
{: .text-justify}

Uma outra maneira mais simples de visualizar os arquivos modificados desde o último commit é pelo commando **git status**: 
{: .text-justify}

```bash
git status
```

Uma maneira mais fácil de adicionar arquivos separadamente é pelo commando **git add**:
{: .text-justify}

```bash
git add caminho/do/arquivo/nomedoarquivo.formato
```

Para enviar o commit:
{: .text-justify}

```bash
git commit -m "NomeDoCommit"
```

Um exemplo prático de fluxo de um commit pela linha de comando:
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/bash_commit.JPG" alt="Bash Commit">{: .center-image }

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

## Boas Práticas e Padrões 2

Para os commits, costumamos colocar uma **TAG** padrão no início da mensagem de *commit*, estamos utilizando os seguintes padrões:
{: .text-justify}

* **\[ADD\] -** Para commits que estão adicionando arquivos e\ou funcionalidades;
* **\[RMV\] -** Para commits que estão **apenas** removendo arquivos e\ou funcionalidades; 
* **\[IMP\] -** Para commits que estão implementando melhorias em uma funcionalidade já existente;
* **\[REF\] -** Para commits que estão **apenas** refatorando códigos existentes, isto é, renomeando ou movendo arquivos\códigos;
* **\[WIP\] -** Para commits que ainda estão em desenvolvimento, ou seja, estão incompletos.

Exemplos de commits:
{: .text-justify}

* **\[ADD\]** Adicionada uma nova cena;
* **\[ADD\]** Adicionada a funcionalidade do player pular;
* **\[RMV\]** Removidas algumas variáveis que não estavam sendo utilizadas;
* **\[IMP\]** Otimizado o script que checava a colisão entre o player e os inimigos;
* **\[IMP\]** Foi diminuído o número de variáveis responsáveis pelo tratamento de erros no sistema de importação de arquivos;
* **\[REF\]** Script de movimentação do player foi movido para um novo arquivo dedicado a isso;
* **\[WIP\]** Avanço na implementação do sistema procedural de plataformas. 

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #

{% endcomment %}
## Amend - Alterando seu último commit 

Em poucas palavras, *amend* é uma forma de alterar o último *commit* realizado em uma branch de um repositório.
{: .text-justify}

**Situação hipotética:**
* Você, usuário, acabou de *commitar* uma alteração trabalhando no script de gerenciamento de plataformas;
* Após algum tempo de reflexão, você percebe que faltou a adição de uma linha de código para o *commit* em questão;
* No lugar de criar um novo *commit* para incluir a adição da nova linha, você pode alterá-lo adicionando a nova linha e, até mesmo, alterando a mensagem de *commit*.

### Como criar um ammend:

### Pelo Gitkraken

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_ammend.png" alt="Gitkraken Ammend">{: .center-image }

Para enviar o commit forçando a reconstrução dos *commits* remotos.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_force_push.png" alt="Gitkraken Force Push">{: .center-image }


### Pela linha de comando:

```bash
git add .
git commit --ammend
```

Para enviar o commit forçando a reconstrução dos *commits* remotos.
{: .text-justify}

```bash
git push origin nomeDaBranch -f 
```


### Duas observações sobre **amend**:
1. Caso **NÃO** tenha sido dado *PUSH* no commit **anterior**, o **amend** não trará nenhuma consequência negativa;
2. Caso **JÁ** tenha sido dado *PUSH* no commit **anterior**, o **amend** fará com que seja necessário forçar uma reconstrução dos commits remotos.
    * **Por que isso é um problema?** Porque, caso tenha mais alguém trabalhando na mesma *branch* em que o **amend** foi realizado, caso essa pessoa já tenha dado um **Pull** e baixado para sua branch local as alterações que você está modificando, será necessário que essa pessoa reconstrua os commits locais dela.
{: .text-justify}

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

## Stash - Guardando alterações para mais tarde

A *Stash* é uma pilha usada para guardar alterações feitas em um repositório local. 
{: .text-justify}

Suponha a seguinte situação:
* Você está trabalhando na criação da I.A. dos inimigos de seu jogo;
* Algum parceiro de equipe te pede para ajudá-lo em uma funcionalidade que ele está trabalhando;
* Você interrompe seu trabalho para ajudá-lo, mas precisa guardar suas alterações em algum lugar, antes de mudar para a branch de seu colega;
* Como fazer isso?
{: .text-justify}

Uma alternativa é *commitar* todas suas alterações para um *commit* temporário, para então mudar para a *branch* de seu amigo.
{: .text-justify}

Mas uma alternativa melhor é a utilização da **Stash** para guardar seu atual trabalho.
{: .text-justify}

A **Stash** funciona da seguinte maneira:
1. Você joga na *Stash* suas modificações atuais na *branch* a qual está trabalho;
2. A *Stash* cuida para criar um 'commit' temporário nela, que pode ser acessado mais tarde;
3. Quando quiser voltar ao trabalho de onde parou, basta pedir para a *Stash* as suas modificações que foram salvas, o *Git* se encarregará de atualizar seu repositório local com as alterações salvas anteriormente.
{: .text-justify}

Notas:
* A *Stash* consegue salvar arquivos inteiros inseridos ou removidos durante o trabalho;
* A *Stash* também consegue salvar apenas linhas adicionadas ou removidas durante o trabalho;
* Apesar de ser uma **pilha**, você não necessariamente terá acesso apenas ao último elemento adicionado na *Stash*.

### Pelo Gitkraken

Primeiro, tendo alterações para serem *commitadas*, basta clicar no botão **Stash**, no topo do programa.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_stash_button.JPG" alt="Gitkraken Stash Button">{: .center-image }

Após isso, será adicionado um novo elemento no submenu *Stash*, no menu lateral esquerdo. Clicando-se na *stash* criada serão mostradas as alterações no menu lateral direito do programa.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_stash.JPG" alt="Gitkraken Stash">{: .center-image }

Para aplicar as alterações da Stash novamente no código, basta ir na opção **Apply** ou na opção **POP**.
* A opção **Apply** aplicará as alterações da *Stash* no seu trabalho atual, **mantendo** a *Stash* intacta;
* A opção **POP** aplicará as alterações da *Stash* no seu trabalho atual, porém **removendo** o item da *Stash*.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_stash_pop.JPG" alt="Gitkraken Stash Popup">{: .center-image }


### Pela linha de Comando

Pela linha de comando, apenas 3 comandos são necessários:
{: .text-justify}

* **git stash** - Guardará o trabalho atual na *Stash*
{: .text-justify}
```bash
git stash 
```

* **git stash pop** - Recuperará o trabalho a partir do **último item** da *Stash*, **removendo-o** da *Stash*
{: .text-justify}
```bash
git stash pop
```


* **git stash apply** - Recuperará o trabalho a partir do **último item** da *Stash*, **mantendo-o** na *Stash*
{: .text-justify}
```bash
git stash apply
```

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/bash_stash.JPG" alt="Bash Stash">{: .center-image }


Para trabalhar com itens da *Stash* mais antigos, é necessário mais um parâmetro nos dois comandos anteriores.
{: .text-justify}

* **git stash list** - Lista os itens salvos na *Stash*
{: .text-justify}

```bash
git stash list
```
* **git stash pop\apply stash@{indice}** - Aplica o item passado pelo parâmetro **indice** da *Stash* no trabalho atual
{: .text-justify}

```bash
git stash pop stash@{indice}
git stash apply stash@{indice}
```


* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

## Rebase - Alterando Commits antigos

O *Rebase* é utilizado em muitas situações. No momento me limitarei a usá-lo com o intuito de alterar um **ou mais** *commits* antigos.
{: .text-justify}

### Pela linha de comando:

Primeiro, deve-se utilizar a ferramenta **TIG** para procurar **até qual** *commit* o rebase atuará.
{: .text-justify}

```bash
tig 
```

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/bash_tig2.png" alt="Bash TIG">{: .center-image }

No menu do **tig**, navegue até o commit **anterior** ao commit que se deseja modificar.  No caso da imagem acima, queremos modificar a mensagem do commit **\[WIP\]**, então entramos no commit **\[ADD\] Gitkraken Empty Post**.
{: .text-justify}

Estando no *commit* desejado, devemos copiar a **HASH** do *commit*, que é o valor *hexadecimal* que representa o *commit* no servidor remoto.
{: .text-justify}


Com a *hash* copiada, damos o comando **rebase**, passando como parâmetro a *hash* copiada e o parâmetro **-i**, para que o *rebase* seja feito iterativamente.
{: .text-justify}

```bash
git rebase -i 85cfe54448545ef65072dd5f8a2f5e3958cc00e1
```

Com isso, será aberta uma tela com instruções sobre como fazer um *rebase*.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/bash_rebase.png" alt="Bash Rebase">{: .center-image }

Como queremos apenas **renomear** o commit **\[WIP\]**, utilizaremos a palavra **reword** na frente do mesmo, seguido de **CTRL + X** para continuar o processo.
{: .text-justify}

Em seguida, uma tela para modificar o texto do *commit* especificado se abrirá, bastando modificar a mensagem de *commit*, como na imagem abaixo.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/bash_rebase_reword.png" alt="Bash Rebase Reword">{: .center-image }


No final, é necessário realizar um *pull* forçado pelo parâmetro **-f**, lembrando que isso **reconstruirá** a sequência dos commits remotos, o que pode quebrar o trabalho de outra pessoa que esteja atuando na mesma *branch*:
{: .text-justify}

```bash
git push origin nomeDaBranch -f 
```

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

# Criando Pull-Requests

Quando se está trabalhando em uma *Branch* separada, após o trabalho ter terminado, é necessário juntar o código feito com o código da *Branch* de desenvolvimento que o resto da equipe está utilizando. Para isso, utilizamos os **Pull-Requests**.
{: .text-justify}

### Pelo Gitkraken

Basta utilizar o botão **+** no submenu *Pull-Requests*
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_pull_request.JPG" alt="GitKraken Pull-Request">{: .center-image }

### Pelo site do Github

Pelo site também é bem simples, bastando ir no menu *Pull-Request* e clicar no botão **New Pull-Request**:
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_pull_request.JPG" alt="Github Pull-Request">{: .center-image }


<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_pull_request_2.JPG" alt="Github Pull-Request">{: .center-image }

Note, nessa última imagem, que existe a mensagem **"Can't Automatically Merge"**. Isso significa que existe algum **conflito** impossibilitando o **merge** do Pull-Request.
{: .text-justify}

Para tratar essa situação, veja o tópico <A href="#tratando-conflitos">**"Tratando Conflitos"**</A>.
{: .text-justify}


* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

## Boas Práticas e Padrões 3

Na imagem de criação de *Pull-Requests* do tópico anterior, pode ser visto alguns campos a serem preenchidos.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_pull_request.JPG" alt="GitKraken Pull-Request">{: .center-image }


Esses campos são:
* **Title -** O título do *Pull-Request*. Aqui você colocará uma mensagem curta, resumindo o que o *Pull-Request* se propõe;
* **Description -** Caso necessário, uma descrição detalhada do problema a ser resolvido pelo *Pull-Request* criado. E **mais importante**, explicando como esse *Pull-Request* deve ser testado, quais os passos para fazê-lo funcionar.
* **Reviewers -**  Caso necessário, marque os amiguinhos para que eles recebam notificações para testar seu *Pull-Request*;
* **Assignees -** Neste campo devem ser marcadas as pessoas que trabalharam no *Pull-Request*;
* **Labels -**  Este campo varia de projeto para projeto. No jogo em que estou trabalhando no momento, criamos **labels** para diferenciar o **assunto** de cada *Issue* e de cada *Pull-Request*.
{: .text-justify}


* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #
{% endcomment %}

## Tratando Conflitos - Separando crianças de adultos

Conflitos ocorrem quando se está tentando aplicar uma alteração de código em outro código também já alterado. Basicamente um conflito ocorre quando **o mesmo trecho de código** foi alterado por **2 ou mais pessoas** e as duas alterações estão sendo **combinadas**.
{: .text-justify}

Exemplos de situações:
* Ao tentar aplicar o código da *Stash* em cima de um código seu;
* Ao tentar dar **Merge** de uma branch em cima de outra branch.
{: .text-justify}

Sobre este último exemplo, explicarei com uma situação hipotética:
1. Sua equipe está trabalhando com a *branch* **Develop** como *branch* de desenvolvimento;
2. Você cria uma nova *branch* chamada **fix/player_jump**, a partir da **Develop**, com o intuito de corrigir um *BUG* no pulo do *player*;
3. Um outro membro da equipe cria uma branch chamada **feature/player_score**, a partir da **Develop**, para implementar o sistema de *Score* do player;
4. Você termina de implementar a correção, fazendo um *Pull-Request* e dando *Merge* do mesmo na branch **Develop**;
    * Neste momento, a branch **feature/player_score** está **ATRÁS** da *Develop*, pois os *Commits* recebidos por ela da branch **fix/player_jump** a colocaram mais à frente. 
5. O outro membro da equipe, enquanto implementava o sistema de *Score*, percebe o *BUG* no pulo do *player* e resolve corrigí-lo com um *Commit*;
6. Ao tentar fazer um *Pull-Request*, o outro membro da equipe receberá um aviso de **conflito**, pois o *commit* de correção do pulo do *player* está em conflito com o código já feito por você, na *branch* **fix/player_jump**.
{: .text-justify}

**O que fazer nessa situação?**
{: .text-justify}


Tratar conflitos nada mais é, neste caso, do que trazer as novas alterações da **Develop** para a *branch* **feature/player_score**, escolhendo qual código de correção do pulo do *player* será usado, o já existente na **Develop** ou o novo, fornecido pela **feature/player_score**.
{: .text-justify}

### Tratando conflitos pelo site do Github

Na situação demonstrada no tópico anterior, onde surgiram conflitos a serem resolvidos, irei mostrar como tratá-los pelo site do *Github*.
{: .text-justify}

Na tela do *Pull-Request* criado no github, descendo um pouco, será possível visualizar quais arquivos estão conflitantes, seguido do botão **Resolve Conflicts**.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_pull_request_4.JPG" alt="Github Pull-Request">{: .center-image }

Ao clicar no botão **Resolve Conflicts**, será aberta uma nova tela mostrando o código em questão.
{: .text-justify}


<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/github_pull_request_5.JPG" alt="Github Pull-Request">{: .center-image }


Na imagem acima, existem dois pontos no código que foram **criados** pelo *github* para separar o conflito em duas partes: o código da **Develop** e o código de onde se deseja dar **merge**.
* **<<<<<<< feature/vertical_platform -** Esta seção mostra o código da *Branch* **feature/vertical_platform**;
* **>>>>>>> develop -** Esta seção mostra o código da *Branch* **Develop**.
{: .text-justify}

Quem for tratar o conflito deve, manualmente, editar o código pelo próprio *Github*, afim de escolher qual será o trecho de código utilizado.
{: .text-justify}

O mesmo deverá ser feito para todos os arquivos conflitantes do Pull-Request.
{: .text-justify}


### Tratando conflitos pelo Gitkraken

No *Gitkraken* é possível tratar conflitos de uma maneira mais eficiente do que a vista no site do *Github*.
{: .text-justify}

No programa, o que será feito é aplicar os *commits* da branch **Develop** na *branch* em que estamos trabalhando. Para cada *Commit* aplicado, teremos que tratar os possíveis conflitos.
{: .text-justify}


Primeiro, deve-se entrar na *Branch* a qual se está trabalhando, clicar com o **botão direito** na branch **REMOTA** **Develop** e selecionar a opção **Rebase**.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_pull_request_2.JPG" alt="Gitkraken Pull-Request">{: .center-image }

Feito isso, caso **não hajam** conflitos, você não precisa continuar neste tópico :P. Agora, **havendo** conflitos, o próprio *Gitkraken* trará um aviso, no menu lateral **esquerdo**.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_pull_request_3.JPG" alt="Gitkraken Pull-Request">{: .center-image }


Ao clicar no botão **View Conflict**, serão mostrados os arquivos com conflitos. Você terá que clicar em **cada um** deles e resolver seus conflitos.
{: .text-justify}


<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_pull_request_4.JPG" alt="Gitkraken Pull-Request">{: .center-image }


Na tela de resolução de conflitos, a visualização será repartida em 3 seções.
* **Lado esquerdo -** É mostrado o código da branch **Develop**;
* **Lado direito -** É mostrado o código da branch que se está trabalhando;
* **Parte Inferior -** É mostrado o código resultante da combinação escolhida dos códigos das duas *branches*.
{: .text-justify}

Assim como no tratamento de conflitos pelo site do *Github*, será necessário escolher quais partes do código deverão entrar no código final, escolhendo entre as telas dos lados direito e esquerdo. Após terminar, basta clicar no botão **Save**.
{: .text-justify}


<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_pull_request_5.JPG" alt="Gitkraken Pull-Request">{: .center-image }


Após salvas as alterações, você será redirecionado para a tela anterior, onde eram mostrados os arquivos com conflito. Nesta tela, basta clicar no botão **Continue Rebase**, para que seja continuado o tratamento de conflitos.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_pull_request_6.JPG" alt="Gitkraken Pull-Request">{: .center-image }

Provavelmente será necessário repetir os passos anteriores para cada vez que forem identificados novos conflitos. Sempre clicando em **Continue Rebase**. 
{: .text-justify}

Após terminar de resolver todos os conflitos, será necessário dar um novo **Push**, forçando o envio de alterações para o servidor remoto, pois o histórico de *Commits* foi reescrito, para a *Branch* em que se está trabalhando.
{: .text-justify}

<img src="{{ site.url }}{{ site.baseurl }}/images/gitkraken/gitkraken_pull_request_7.JPG" alt="Gitkraken Pull-Request">{: .center-image }


### Tratando conflitos pelo Visual Studio

O *Visual Studio* tem uma ferramenta interna para tratar conflitos *Git*. Deixarei um *link* de um vídeo muito bom ensinando como isso é feito.
{: .text-justify}

[**Handling Merge Conflicts with Visual Studio and SourceTree**](https://www.youtube.com/watch?v=yGxY573b7RM&list=PLgViB0Msq6L06JZUkbze1AYlSdpYh9FVD&index=8&t=0s)

### Unity Smart Merge

Quando estamos tratando conflitos, faz sentido os arquivos *conflitantes* serem códigos. Mas o que acontece quando existe conflitos em outros arquivos, como os arquivos **.unity** e **.prefab**????
{: .text-justify}

A dica é: **TENTE EVITAR CONFLITOS NESTES ARQUIVOS**.
{: .text-justify}


Como fazer isso? Para evitar conflito em arquivos **.unity**, basta **SEMPRE** criar uma nova cena para trabalhar em alguma *branch* nova, pois assim **nunca** duas pessoas trabalharão no mesmo arquivo **.unity**.
{: .text-justify}

Para evitar conflitos nos arquivos **.prefab**, a dica é... converse com seu grupo sempre, e evite ter mais de uma pessoa trabalhando nos mesmos *prefabs*.
{: .text-justify}


**Mas e se já existirem conflitos, como tratá-los?** 
{: .text-justify}

Ahhh, jovem. A maneira mais simples neste caso é **Recriar** o que estiver fazendo do *ZERO*, tentando evitar os conflitos. Mas, caso esta não seja uma opção, existe uma ferramenta chamada **Smart Merge**.
{: .text-justify}

**Smart Merge** é um *Merge Tool* especial para *Sistemas de Controle de Versão* que estejam trabalhando com a **Unity**, o que ele faz é **Magicamente** tratar conflitos de arquivos **.prefab** e **.unity**.
{: .text-justify}


Me limitarei a deixar um link sobre o assunto. Caso algum dia seja necessário, farei um novo tópico sobre ele: [**Smart Merge**](https://docs.unity3d.com/Manual/SmartMerge.html)
{: .text-justify}

* <A href="#links-rápidos">Voltar ao Início</A>

{% comment %}
 # ---------------------------------------------------------------------------------------------------------------------------------------- #

{% endcomment %}

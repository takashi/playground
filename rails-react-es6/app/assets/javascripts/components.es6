//= require_tree ./components

class Article extends React.Component {
  // getInitialState doesnt work with react-rails :(
  getInitialState() {
    return { articles: this.props.initialArticles }
  }
  render() {
    var articles = this.state.articles.map(function(article) {
      return <div>{ article.title }</div>
    })
    return <div>{ articles }</div>
  }
}

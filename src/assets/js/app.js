$(document).foundation();

var mySVGsToInject = document.querySelectorAll('img.inject-me');

SVGInjector(mySVGsToInject);
var $searchInput = $('input[type="search"]')
var setupFilterable = function($current, $links, updateMethod) {
  $links.on('click', function(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    var type = $el.data().type;
    $current.text($el.text());
    updateMethod(type);
    $links.each(function() {
      var $link = $(this);
      if (typeof($link.data().hideActive) === 'undefined') {
        if ($link.data().type === type) {
          $link.addClass('is-active');
        } else {
          $link.removeClass('is-active');
        }
      } else {
        if ($link.data().type === type) {
          $link.addClass('hide');
        } else {
          $link.removeClass('hide');
        }
      }
    });
  });
}
if($searchInput.is('*')) {
  window.search = new Search({
    input: $('input[type="search"]'),
    searchContainer: $('#search-results-container .card-container'),
    onSearch: function(term, filter, sort, results) {
      if(term.length > 0 || filter !== 'all' || sort !== 'newest') {
        $('#main-results-container').hide();
        $('#search-results-container').show();
      } else {
        $('#main-results-container').show();
        $('#search-results-container').hide();
      }
    }
  });
  var $currentSort = $('[data-sort-current]');
  var $sortLinks = $('[data-sort]');
  setupFilterable($currentSort, $sortLinks, window.search.setSort.bind(window.search));

  var $currentFilter = $('[data-filter-current]');
  var $filterLinks = $('[data-filter]');
  setupFilterable($currentFilter, $filterLinks, window.search.setFilter.bind(window.search));
  $('#bb-search-bar').on('close.zf.trigger', function() {
    $searchInput.val('');
    window.search.updateSearch();
  }).on('toggle.zf.trigger', function() {
    setTimeout( () => { $searchInput.focus();}, 1)
  });
}

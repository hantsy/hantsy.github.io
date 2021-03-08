# https://import.jekyllrb.com/docs/rss/
require "jekyll-import"

module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)
        p 'import rss from medium'
        JekyllImport::Importers::RSS.run({
            "source" => "https://medium.com/feed/@hantsy"
          })
    end
  end
end

# -*- encoding: utf-8 -*-
# stub: rails_same_site_cookie 0.1.8 ruby lib

Gem::Specification.new do |s|
  s.name = "rails_same_site_cookie".freeze
  s.version = "0.1.8"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "homepage_uri" => "https://github.com/pschinis/rails_same_site_cookie", "source_code_uri" => "https://github.com/pschinis/rails_same_site_cookie" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Philip Schinis".freeze]
  s.bindir = "exe".freeze
  s.date = "2020-03-21"
  s.email = ["p.schinis@gmail.com".freeze]
  s.homepage = "https://github.com/pschinis/rails_same_site_cookie".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.1.4".freeze
  s.summary = "This gem allows you to set the SameSite=None cookie directive without breaking browsers that don't support it.".freeze

  s.installed_by_version = "3.1.4" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<bundler>.freeze, [">= 1.17"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_runtime_dependency(%q<rack>.freeze, [">= 1.5"])
    s.add_runtime_dependency(%q<user_agent_parser>.freeze, ["~> 2.5"])
  else
    s.add_dependency(%q<bundler>.freeze, [">= 1.17"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<rack>.freeze, [">= 1.5"])
    s.add_dependency(%q<user_agent_parser>.freeze, ["~> 2.5"])
  end
end

source "https://rubygems.org"
git_source(:github) {|repo| "https://github.com/#{repo}.git" }

ruby "3.0.3"

gem "colorize"
gem "pg", "~> 1.1"
gem "puma", "~> 5.0"
gem "rails", "~> 6.1.4"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'
gem "active_model_serializers", "~> 0.10.0" # シリアライザー
gem "bootsnap", ">= 1.4.4", require: false
gem "devise" # ログイン機能
gem "devise_token_auth" # トークン認証
gem "factory_bot_rails"
gem "faker"
gem "foreman"
gem "rack-cors"
gem "rails-i18n", "~> 6.0.0" # 日本語化

group :development, :test do
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "dotenv-rails"
  gem "pry-byebug"        # デバッグ用
  gem "pry-doc"           # デバッグ用
  gem "pry-rails"
  gem "rspec-rails"       # Rails用のテストフレームワーク
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
end

group :development do
  gem "letter_opener_web", "~> 1.0"
  gem "listen", "~> 3.3"
  gem "pre-commit", require: false
  gem "spring"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]

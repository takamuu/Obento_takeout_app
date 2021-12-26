source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.3'

gem 'rails', '~> 6.1.4'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem "colorize"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'
gem 'devise' # ログイン機能
gem 'devise_token_auth' # トークン認証
gem 'active_model_serializers', '~> 0.10.0' # シリアライザー
gem 'rails-i18n', '~> 6.0.0' # 日本語化
gem 'bootsnap', '>= 1.4.4', require: false
gem 'rack-cors'
gem 'foreman'
gem 'factory_bot_rails'
gem 'faker'  

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails'       # Rails用のテストフレームワーク 
  gem 'pry-byebug'        # デバッグ用
  gem 'pry-doc'           # デバッグ用
  gem 'pry-rails'
end

group :development do
  gem 'listen', '~> 3.3'
  gem 'spring'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

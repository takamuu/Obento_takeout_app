class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  # skip_before_action :verify_authenticity_token
  # helper_method :current_user, :user_signed_in?

  include ActionController::MimeResponds
  
  def fallback_index_html
      respond_to do |format|
          format.html { render body: Rails.root.join('public/index.html').read }
      end
  end
end

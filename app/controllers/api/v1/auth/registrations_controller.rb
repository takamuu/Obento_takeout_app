module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        private

          def account_update_params
            params.require(:user).permit(:id, :name, :kana, :phone_number)
          end

          def sign_up_params
            params.permit(:email, :password, :password_confirmation, :name, :kana, :phone_number)
          end
      end
    end
  end
end

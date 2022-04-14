module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        before_action :set_user, only: %i[edit]

        def edit
          if @user
            render json: @user, status: :ok
          else
            render json: [], status: :no_content
          end
        end

        private

          def set_user
            @user = User.find_by(id: account_update_params[:id].to_i)
          end

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

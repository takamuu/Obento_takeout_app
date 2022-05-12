module Api
  module V1
    class ContactsController < ApplicationController
      before_action :authenticate_api_v1_user!

      def create
        @contact = Contact.new(contact_params)
        if @contact.save
          # ユーザーにメールを送信
          ContactMailer.user_email(@contact).deliver_now
          # 管理者にメールを送信
          ContactMailer.admin_email(@contact).deliver_now
          render status: :ok
        else
          render status: :internal_server_error
        end
      end

      private

        # IPアドレスをパラメータに追加
        def contact_params
          params.require(:contact).
            permit(:title, :content).
            merge(user_id: current_api_v1_user.id, remote_ip: request.remote_ip)
        end
    end
  end
end

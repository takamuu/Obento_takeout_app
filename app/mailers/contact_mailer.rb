class ContactMailer < ApplicationMailer
  ADMIN_EMAIL = "takapon589@gmail.com".freeze

  def user_email(contact)
    @contact = contact
    @name = contact.user.name
    subject = "【アプリ名】お問い合わせを受付いたしました"

    mail(to: contact.user.email, subject: subject)
  end

  def admin_email(contact)
    @contact = contact
    @name = contact.user.name
    subject = "【アプリ名】お問い合わせがありました"

    mail(to: ADMIN_EMAIL, subject: subject)
  end
end

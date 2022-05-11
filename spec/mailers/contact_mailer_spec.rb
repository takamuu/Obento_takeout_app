require "rails_helper"

RSpec.describe ContactMailer, type: :mailer do
  describe "user_email" do
    before {
      @contact = create(:contact)
    }

    let(:mail) { ContactMailer.user_email(@contact) }

    it "renders the headers" do
      expect(mail.subject).to eq("【アプリ名】お問い合わせを受付いたしました")
      expect(mail.to).to eq([@contact.user.email])
      expect(mail.from).to eq(["takapon589@gmail.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(@contact.user.name)
    end
  end

  describe "admin_email" do
    before {
      @contact = create(:contact)
    }

    let(:mail) { ContactMailer.admin_email(@contact) }

    it "renders the headers" do
      expect(mail.subject).to eq("【アプリ名】お問い合わせがありました")
      expect(mail.to).to eq(["takapon589@gmail.com"])
      expect(mail.from).to eq(["takapon589@gmail.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(@contact.user.name)
    end
  end
end

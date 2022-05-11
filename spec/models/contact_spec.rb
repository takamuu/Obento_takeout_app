require "rails_helper"

RSpec.describe Contact, type: :model do
  describe "バリデーションのチェック" do
    subject { contact.valid? }

    context "データが条件を満たす時" do
      let(:contact) { build(:contact) }
      it "保存できる" do
        expect(subject).to eq true
      end
    end

    context "titleが空欄の場合" do
      let(:contact) { build(:contact, title: "") }
      it "保存できない" do
        expect(subject).to eq false
      end
    end

    context "titleが100文字を超える場合" do
      let(:contact) { build(:contact, title: "a" * 101) }
      it "保存できない" do
        expect(subject).to eq false
      end
    end

    context "contentが空欄の場合" do
      let(:contact) { build(:contact, content: "") }
      it "保存できない" do
        expect(subject).to eq false
      end
    end

    context "contentが2000文字を超える場合" do
      let(:contact) { build(:contact, content: "a" * 2001) }
      it "保存できない" do
        expect(subject).to eq false
      end
    end

    context "ユーザーが削除されたとき" do
      subject { @contact.user.destroy }

      before {
        @contact = create(:contact)
      }

      it "お問い合わせも削除される" do
        expect { subject }.to change { Contact.count }.by(-1)
      end
    end
  end
end

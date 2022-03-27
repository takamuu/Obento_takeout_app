require "rails_helper"

RSpec.describe "Api::V1::OrderDetails", type: :request do
  xdescribe "GET /index" do
    it "returns http success" do
      get "/api/v1/order_details/index"
      expect(response).to have_http_status(:success)
    end
  end
end

class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index
    # @messages = Message.
    # @message = Message.new
  end

  def create
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end

end
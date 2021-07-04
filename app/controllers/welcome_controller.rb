class WelcomeController < ApplicationController
  def index
    #ActionCable.server.broadcast('notification_channel','Hello, how are you') 
  end
end

class ReminderJob < ApplicationJob
  queue_as :default

  def perform(event)  #*args
    
    return if event.start_time > Time.current
    #ActionCable.server.broadcast('notification_channel', 'You have upcoming event in 5 minutes.')
    # Do something later
  end
end

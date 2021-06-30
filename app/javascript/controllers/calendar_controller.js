import { Controller} from "stimulus"
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list' 
import interactionPlugin from '@fullcalendar/interaction'
import Rails from '@rails/ujs'

export default class extends Controller {
    static targets = [ "calendar" ]

    connect(){
      const calendarTarget = this.calendarTarget
      let calendar = new Calendar(calendarTarget, {
        plugins: [dayGridPlugin, timeGridPlugin,listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {left: 'dayGridMonth,timeGridWeek,timeGridDay', center: 'title'} ,
      })
      calendar.render()
    }    
}
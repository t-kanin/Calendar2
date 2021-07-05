import { Controller} from "stimulus"
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list' 
import interactionPlugin from '@fullcalendar/interaction'
import Rails from '@rails/ujs'
import Turbolinks from "turbolinks"

export default class extends Controller {
    static targets = [ "calendar","modal", "start_time", "end_time"]
    
    connect(){
      const calendarTarget = this.calendarTarget
      const modalTarget = this.modalTarget
      let _this = this

      //Function for creating the calendar from the fullcalendar framework
      let calendar = new Calendar(calendarTarget, {
        // get events from the url http://127.0.0.1:3000/events.json
        // However the events will not display yet because the format in events.json does not match the fullcalendar framework
        // 'start_time' and 'end_time' need to be renamed to 'start' and 'end'
        themeSystem: 'Lumen',
        timeZone: 'Asia/Bangkok', // UTC
        events: '/events.json', 
        editable: true,
        plugins: [dayGridPlugin, timeGridPlugin,listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {left: 'dayGridMonth,timeGridWeek,timeGridDay', center: 'title'} ,
        navLinks: true, 

        // function for modal pop-up  when click the date 
        navLinkDayClick: function(date, jsEvent) {
          modalTarget.setAttribute("style","display: block;")
          _this.start_timeTarget.value = date 
          _this.end_timeTarget.value = date
        },

        eventClick: function(info){
          info.jsEvent.preventDefault() //dont let the browser naviate which leads to json url 
          Turbolinks.visit(info.event.extendedProps.show_url)
        },

        // drag and drop event on calendar
        eventDrop: function(info){
          let data = _this.data(info)
          updateEvent(data, info.event.url)
        },

        // resize the event on calendar 
        eventResize: function(info){
          let data = _this.data(info)
          updateEvent(data, info.event.url)
        },

      })

      //rendering the calendar to the view
      calendar.render()
    }


    // create parameters that can be POST back using rails/ujs
    data(info){
      return{
        "event[start_time]": info.event.start,
        "event[end_time]": info.event.end,
      }
    }

}

function updateEvent(data, url){
  //console.log(info.event.url) -> http://127.0.0.1:3000/events/5.json

  Rails.ajax({
    type: 'PATCH',
    url:  url,  
    data: new URLSearchParams(data).toString()
  })
}
import $ from 'jquery';
export default function formData(form) {
  var formdata = $(form).serializeArray();
  var data = {};
  $(formdata ).each(function(index, obj){
      data[obj.name] = obj.value;
  });
  return data;
}
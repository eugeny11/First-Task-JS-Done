const API_KEY =
  "v1u:AQIBAHj-LzTNK2yuuuaLqifzhWb9crUNKTpk4FlQ9rjnXqp_6AE-mSRsNEc-qt-JZF1QvUyHAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMGqcEIUgSSD15bcXPAgEQgDtLA6W-OJ_ytVMrWzkVH7tyBFy3C5ZLb1hgRXukifjFKHrPSN0XT5mLYmrNgQAPNro5MhWeqqjIaVI6zA:qs_3wOQQ-Rda_YDIUr5MrDldwxVdUR45-i1ovVkn50gc-GKj6zZenDVz_pmUmxLMV9_n6kvab9k-urgQlXklkY1PCy3OSkzo_4lvZk7gp2M8OMkvv0bU976W63TMYDaRSQRKcOSbpsMCMQ_ZxYq4PPrwbmiTPiyS9uvC1ZroCANEXmisiuimmcZLbTWFiZligc6DLLCuKhnb50RvfcgmTFzyZFlr0r_muEbR0PCnDo5cD0uyOm9GQdxuBjKlRwRYA0hUGkDUVI5XECZ_rsK5xa3IXL4JoAdcKnHrV8RjAbZ4HC3FfwBab2bGvI_1SWtde6a6-VpqTA";
document
  .getElementById("job-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const startDate = document.getElementById("start-date").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${startDate}T${endTime}`);
    const durationInMinutes = (endDateTime - startDateTime) / (1000 * 60);
    const durationHours = Math.floor(durationInMinutes / 60);
    const durationMinutes = durationInMinutes % 60;

    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zipCode = document.getElementById("zip-code").value;
    const address = document.getElementById("address").value;
    const area = document.getElementById("area").value;

    const fullLocation = `${address}, ${city}, ${state}, ${zipCode}, ${area}`;

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const jobType = document.getElementById("job-type").value;
    const jobDescription = document.getElementById("job-description").value;

    const note = `${phone}, ${email}`;

    const duration = `${durationHours}:${durationMinutes
      .toString()
      .padStart(2, "0")}`;

    const urlParams = new URLSearchParams(window.location.search);
    const dealId = Number(urlParams.get("selectedIds"));

    const formData = {
      subject: `${document.getElementById("first-name").value} ${
        document.getElementById("last-name").value
      }`,
      due_date: startDate,
      due_time: startTime,
      duration: duration,
      location: fullLocation,
      type: jobType,
      note: note,
      public_description: jobDescription,
      deal_id: dealId,
    };

    fetch("https://api.pipedrive.com/v1/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Success:", data);

          const createJobButton = document.getElementById("create-job");
          createJobButton.classList.remove("gold-btn");
          createJobButton.classList.add("red-btn");
          createJobButton.innerHTML = "Request is sent";

          setTimeout(function () {
            window.location.href = "result.html";
          }, 4000);
        } else {
          console.error("API Error:", data);
          alert(
            "Failed to add the activity. Please check the data or API response."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding work");
      });

    document.querySelectorAll("input, select, textarea").forEach((field) => {
      if (field._flatpickr) {
        field._flatpickr.clear();
      } else {
        field.value = "";
      }

      const placeholder = field
        .closest(".input-wrapper")
        ?.querySelector(".custom-placeholder");
      if (placeholder) {
        placeholder.style.visibility = "visible";
      }

      field.classList.remove("has-value");
    });
  });

flatpickr("#start-date", {
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "F j, Y",
});

flatpickr("#start-time", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true,
});

flatpickr("#end-time", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true,
});

flatpickr("#end-date", {
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "F j, Y",
});

document.getElementById("save-info").addEventListener("click", function () {
  alert("Information is saved locally (or in local storage)");
});

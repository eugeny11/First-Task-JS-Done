const API_KEY =
  "v1u:AQIBAHj-LzTNK2yuuuaLqifzhWb9crUNKTpk4FlQ9rjnXqp_6AE-mSRsNEc-qt-JZF1QvUyHAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMGqcEIUgSSD15bcXPAgEQgDtLA6W-OJ_ytVMrWzkVH7tyBFy3C5ZLb1hgRXukifjFKHrPSN0XT5mLYmrNgQAPNro5MhWeqqjIaVI6zA:VXlFjzwQ-ReuaUKbCpaboW1en6wIxpVazMv_FmQxLDJdJekFN2WgRVnRNo0Y856k7cnx9wMpAnLW29JZF_wU4q_OVwoAg6vBNPUjAHlDsNW6hh-lfZEuZoOlShpW7sUuASrkbeLOOd4P99bzcsLS0Qbd7za9P3q8V1RWyOtLyhCR2TDeQFJdH7d7xfao-aTTofPxHq749yKmnrhLvjSI682-SuxXWo0Gdg5K_GRJCQw7hjSIOds6ksxKo5egm3b5ofrgy-8F74G70bkH4-KKO-ScF8ERQBBKA5tI5VX4XIipgbEnDYDG80Md2yv7IWCx9bW3HY6NMvI60oWLc_kSlost35SRL6xiOLoFJWJy9nKkmOKIvSzCbq5SxmX4Ex3KnBXOOPS3Sr8yoU03I0UWAeIN5Xp-jbBYuyq1IYMlHCWyJaVeW9_X7mIRXBTmFumuz3aIKOvBInB3gQ";
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
    const userId = Number(urlParams.get("userId"));
    const orgId = Number(urlParams.get("companyId"));

    if (!isNaN(dealId) && !isNaN(userId) && !isNaN(orgId)) {
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
        org_id: orgId,
        deal_id: dealId,
        user_id: userId,
      };

      fetch(`https://api.pipedrive.com/v1/activities?api_token=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    } else {
      alert("Invalid ID provided. Please check the data.");
    }
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

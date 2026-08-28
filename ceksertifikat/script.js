
/**
 * =====================================================
 * KONFIGURASI GOOGLE APPS SCRIPT
 * =====================================================
 */

const API_URL =
    "https://script.google.com/macros/s/AKfycbxtNMaF2Wec-LQqkyITKq-uiiN7nSTFT6jROS8p_Yhwbyzg11T0XG8aNBaSzh1tv134qg/exec";


/**
 * =====================================================
 * ELEMENT
 * =====================================================
 */

let loadingBox;
let verifiedResult;
let invalidResult;
let errorResult;

let recipientName;
let certificateProgram;
let certificateId;
let issuer;
let tanggalMulai;
let tanggalSelesai;
let issueDate;
let pejabat;


/**
 * =====================================================
 * AMBIL ELEMENT
 * =====================================================
 */

function initElements() {

    loadingBox =
        document.getElementById("loadingBox");

    verifiedResult =
        document.getElementById("verifiedResult");

    invalidResult =
        document.getElementById("invalidResult");

    errorResult =
        document.getElementById("errorResult");

    recipientName =
        document.getElementById("recipientName");

    certificateProgram =
        document.getElementById("certificateProgram");

    certificateId =
        document.getElementById("certificateId");

    issuer =
        document.getElementById("issuer");

    tanggalMulai =
        document.getElementById("tanggalMulai");

    tanggalSelesai =
        document.getElementById("tanggalSelesai");

    issueDate =
        document.getElementById("issueDate");

    pejabat =
        document.getElementById("pejabat");

}


/**
 * =====================================================
 * TAHUN FOOTER
 * =====================================================
 */

function initYear() {

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

}


/**
 * =====================================================
 * AMBIL NOMOR DARI URL
 * =====================================================
 */

function getTokenFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const token =
        params.get("id");

    if (!token) {

        return null;

    }

    return token
        .trim()
        .toUpperCase();

}


/**
 * =====================================================
 * AMBIL NILAI AMAN
 * =====================================================
 */

function safeValue(value) {

    if (
        value === null ||
        value === undefined ||
        String(value).trim() === ""
    ) {

        return "-";

    }

    return String(value);

}


/**
 * =====================================================
 * SEMBUNYIKAN SEMUA HASIL
 * =====================================================
 */

function hideAllResults() {

    if (loadingBox) {

        loadingBox.classList.add("d-none");

    }

    if (verifiedResult) {

        verifiedResult.classList.add("d-none");

    }

    if (invalidResult) {

        invalidResult.classList.add("d-none");

    }

    if (errorResult) {

        errorResult.classList.add("d-none");

    }

}


/**
 * =====================================================
 * LOADING
 * =====================================================
 */

function showLoading() {

    hideAllResults();

    if (loadingBox) {

        loadingBox.classList.remove("d-none");

    }

}


/**
 * =====================================================
 * TAMPILKAN SERTIFIKAT
 * =====================================================
 */

function showCertificate(data) {

    hideAllResults();

    if (verifiedResult) {

        verifiedResult.classList.remove("d-none");

    }


    if (recipientName) {

        recipientName.textContent =
            safeValue(
                data.nama ||
                data.name ||
                data.Nama
            );

    }


    if (certificateId) {

        certificateId.textContent =
            safeValue(
                data.id ||
                data.nomor ||
                data.nomorSertifikat ||
                data.certificateId
            );

    }


    if (certificateProgram) {

        certificateProgram.textContent =
            safeValue(
                data.program ||
                data.kegiatan ||
                data.judul
            );

    }


    if (issuer) {

        issuer.textContent =
            safeValue(
                data.penerbit ||
                data.issuer
            );

    }


    if (tanggalMulai) {

        tanggalMulai.textContent =
            safeValue(
                data.tanggalMulai ||
                data.mulai
            );

    }


    if (tanggalSelesai) {

        tanggalSelesai.textContent =
            safeValue(
                data.tanggalSelesai ||
                data.selesai
            );

    }


    if (issueDate) {

        issueDate.textContent =
            safeValue(
                data.tanggal ||
                data.tanggalTerbit ||
                data.issueDate
            );

    }


    if (pejabat) {

        pejabat.textContent =
            safeValue(
                data.pejabat ||
                data.penandatangan
            );

    }


    setTimeout(function () {

        if (verifiedResult) {

            verifiedResult.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 100);

}


/**
 * =====================================================
 * TAMPILKAN TIDAK DITEMUKAN
 * =====================================================
 */

function showInvalid(message) {

    hideAllResults();

    if (invalidResult) {

        invalidResult.classList.remove("d-none");

    }


    const description =
        document.getElementById(
            "invalidDescription"
        );


    if (description) {

        description.textContent =
            message ||
            "Sertifikat tidak ditemukan.";

    }


    setTimeout(function () {

        if (invalidResult) {

            invalidResult.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 100);

}


/**
 * =====================================================
 * TAMPILKAN ERROR
 * =====================================================
 */

function showError(message) {

    hideAllResults();

    if (errorResult) {

        errorResult.classList.remove("d-none");

    }


    const errorMessage =
        document.getElementById(
            "errorMessage"
        );


    if (errorMessage) {

        errorMessage.textContent =
            message ||
            "Terjadi kesalahan saat menghubungi server.";

    }


    setTimeout(function () {

        if (errorResult) {

            errorResult.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 100);

}


/**
 * =====================================================
 * CARI SERTIFIKAT
 * =====================================================
 */

function cariSertifikat() {

    const input =
        document.getElementById(
            "searchCertificate"
        );


    if (!input) {

        console.error(
            "ERROR: #searchCertificate tidak ditemukan."
        );

        return;

    }


    const token =
        input.value
            .trim()
            .toUpperCase();


    console.log(
        "Nomor sertifikat yang dicari:",
        token
    );


    if (!token) {

        input.classList.add(
            "is-invalid"
        );

        input.focus();

        return;

    }


    input.classList.remove(
        "is-invalid"
    );


    /*
     * Masukkan nomor ke URL
     */

    const newURL =
        window.location.pathname +
        "?id=" +
        encodeURIComponent(token);


    window.history.replaceState(
        {},
        document.title,
        newURL
    );


    /*
     * Jalankan pencarian
     */

    verifyCertificate(token);

}


/**
 * =====================================================
 * ENTER
 * =====================================================
 */

function setupSearchInput() {

    const input =
        document.getElementById(
            "searchCertificate"
        );


    if (!input) {

        console.warn(
            "Input #searchCertificate tidak ditemukan."
        );

        return;

    }


    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                cariSertifikat();

            }

        }
    );


    input.addEventListener(
        "input",
        function () {

            input.classList.remove(
                "is-invalid"
            );

        }
    );

}


/**
 * =====================================================
 * VERIFIKASI SERTIFIKAT
 * =====================================================
 */

async function verifyCertificate(token) {

    if (!token) {

        return;

    }


    token =
        String(token)
            .trim()
            .toUpperCase();


    showLoading();


    console.log(
        "================================="
    );

    console.log(
        "VERIFIKASI SERTIFIKAT"
    );

    console.log(
        "Nomor:",
        token
    );


    /*
     * Pastikan API tersedia
     */

    if (!API_URL) {

        showError(
            "URL Google Apps Script belum tersedia."
        );

        return;

    }


    /*
     * =================================================
     * BUAT URL API
     * =================================================
     */

    const apiUrl =
        API_URL +
        "?id=" +
        encodeURIComponent(token);


    console.log(
        "API URL:",
        apiUrl
    );


    try {

        /*
         * =================================================
         * FETCH
         * =================================================
         */

        const response =
            await fetch(
                apiUrl,
                {
                    method: "GET",
                    cache: "no-store",
                    redirect: "follow"
                }
            );


        console.log(
            "HTTP Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        /*
         * =================================================
         * BACA RESPONSE
         * =================================================
         */

        const text =
            await response.text();


        console.log(
            "Response mentah:",
            text
        );


        let data;


        try {

            data =
                JSON.parse(text);

        } catch (jsonError) {

            console.error(
                "Response bukan JSON:",
                text
            );

            throw new Error(
                "Server tidak mengembalikan JSON."
            );

        }


        console.log(
            "Data API:",
            data
        );


        /*
         * =================================================
         * CEK VALID
         * =================================================
         */

        const isValid =
            data.valid === true ||
            data.valid === "true" ||
            data.success === true ||
            data.success === "true";


        if (isValid) {

            showCertificate(data);

            console.log(
                "SERTIFIKAT DITEMUKAN"
            );

            return;

        }


        /*
         * =================================================
         * JIKA DATA LANGSUNG DIKIRIM TANPA valid:true
         * =================================================
         */

        if (
            data.nama ||
            data.Nama ||
            data.nomor ||
            data.nomorSertifikat
        ) {

            showCertificate(data);

            console.log(
                "SERTIFIKAT DITEMUKAN - FORMAT DATA LANGSUNG"
            );

            return;

        }


        /*
         * =================================================
         * TIDAK DITEMUKAN
         * =================================================
         */

        showInvalid(
            data.message ||
            data.error ||
            "Sertifikat tidak ditemukan."
        );


        console.log(
            "SERTIFIKAT TIDAK DITEMUKAN"
        );


    } catch (error) {

        console.error(
            "================================="
        );

        console.error(
            "ERROR VERIFIKASI:",
            error
        );

        console.error(
            "================================="
        );


        showError(
            "Sistem verifikasi tidak dapat dihubungi. Silakan coba lagi."
        );

    }

}


/**
 * =====================================================
 * KEMBALI KE PENCARIAN
 * =====================================================
 */

function kembaliKePencarian() {

    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );


    hideAllResults();


    const input =
        document.getElementById(
            "searchCertificate"
        );


    if (input) {

        input.value = "";

        input.classList.remove(
            "is-invalid"
        );

    }


    const heroSection =
        document.querySelector(
            ".hero-section"
        );


    if (heroSection) {

        heroSection.classList.remove(
            "d-none"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    setTimeout(function () {

        if (input) {

            input.focus();

        }

    }, 500);

}


/**
 * =====================================================
 * JALANKAN PENCARIAN DARI URL
 * =====================================================
 */

function checkURLToken() {

    const token =
        getTokenFromURL();


    if (token) {

        console.log(
            "Token ditemukan dari URL:",
            token
        );


        verifyCertificate(token);

    } else {

        hideAllResults();

    }

}


/**
 * =====================================================
 * INIT
 * =====================================================
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Sistem cek sertifikat aktif."
        );


        initElements();

        initYear();

        setupSearchInput();

        checkURLToken();

    }
);

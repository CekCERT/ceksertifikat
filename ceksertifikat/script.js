/**
 * =====================================================
 * URL GOOGLE APPS SCRIPT
 * =====================================================
 *
 * GANTI dengan URL Web App Anda.
 *
 * Contoh:
 *
 * https://script.google.com/macros/s/XXXXXXXX/exec
 *
 */

const API_URL =
    "https://script.google.com/macros/s/AKfycbxtNMaF2Wec-LQqkyITKq-uiiN7nSTFT6jROS8p_Yhwbyzg11T0XG8aNBaSzh1tv134qg/exec";


/**
 * =====================================================
 * AMBIL ELEMENT
 * =====================================================
 */

const loadingBox =
    document.getElementById("loadingBox");

const verifiedResult =
    document.getElementById("verifiedResult");

const invalidResult =
    document.getElementById("invalidResult");

const errorResult =
    document.getElementById("errorResult");


const recipientName =
    document.getElementById("recipientName");

const certificateProgram =
    document.getElementById("certificateProgram");

const certificateId =
    document.getElementById("certificateId");

const issuer =
    document.getElementById("issuer");

const tanggalMulai =
    document.getElementById("tanggalMulai");

const tanggalSelesai =
    document.getElementById("tanggalSelesai");

const issueDate =
    document.getElementById("issueDate");

const pejabat =
    document.getElementById("pejabat");


/**
 * =====================================================
 * TAHUN FOOTER
 * =====================================================
 */

document.getElementById(
    "currentYear"
).textContent =
    new Date().getFullYear();


/**
 * =====================================================
 * AMBIL TOKEN DARI URL
 * =====================================================
 *
 * Contoh URL:
 *
 * https://ceksertifikat.pttunmedan.my.id/?id=X7K92AB81M4P
 *
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
 * FORMAT DATA
 * =====================================================
 */

function safeValue(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "-";

    }


    return value;

}


/**
 * =====================================================
 * TAMPILKAN DATA SERTIFIKAT
 * =====================================================
 */

function showCertificate(data) {

    // Sembunyikan loading
    loadingBox.classList.add("d-none");

    // Sembunyikan error
    errorResult.classList.add("d-none");

    // Sembunyikan invalid
    invalidResult.classList.add("d-none");

    // Tampilkan sertifikat
    verifiedResult.classList.remove("d-none");


    // Nama
    recipientName.textContent =
        safeValue(data.nama);


    // ID
    certificateId.textContent =
        safeValue(data.id);


    // Penerbit
    issuer.textContent =
        safeValue(data.penerbit);


    // Program
    certificateProgram.textContent =
        safeValue(data.program);


    // Tanggal mulai
    tanggalMulai.textContent =
        safeValue(data.tanggalMulai);


    // Tanggal selesai
    tanggalSelesai.textContent =
        safeValue(data.tanggalSelesai);


    // Tanggal terbit
    issueDate.textContent =
        safeValue(data.tanggal);


    // Pejabat
    pejabat.textContent =
        safeValue(data.pejabat);

}


/**
 * =====================================================
 * TAMPILKAN INVALID
 * =====================================================
 */

function showInvalid(message) {

    loadingBox.classList.add("d-none");

    verifiedResult.classList.add("d-none");

    errorResult.classList.add("d-none");

    invalidResult.classList.remove("d-none");


    const description =
        document.getElementById(
            "invalidDescription"
        );


    description.textContent =
        message ||
        "Sertifikat tidak ditemukan dalam sistem.";

}


/**
 * =====================================================
 * TAMPILKAN ERROR
 * =====================================================
 */

function showError(message) {

    loadingBox.classList.add("d-none");

    verifiedResult.classList.add("d-none");

    invalidResult.classList.add("d-none");

    errorResult.classList.remove("d-none");


    const errorMessage =
        document.getElementById(
            "errorMessage"
        );


    errorMessage.textContent =
        message ||
        "Terjadi kesalahan saat menghubungi server.";

}


/**
 * =====================================================
 * VERIFIKASI SERTIFIKAT
 * =====================================================
 */

async function verifyCertificate() {

    // -----------------------------------------------
    // Ambil TOKEN
    // -----------------------------------------------

    const token =
        getTokenFromURL();


    // -----------------------------------------------
    // Tidak ada token
    // -----------------------------------------------

    if (!token) {

        showInvalid(
            "Kode verifikasi tidak ditemukan pada URL."
        );

        return;

    }


    // -----------------------------------------------
    // Cek URL API
    // -----------------------------------------------

    if (
        !API_URL ||
        API_URL.includes(
            "MASUKKAN_URL"
        )
    ) {

        showError(
            "URL Google Apps Script belum dikonfigurasi."
        );

        return;

    }


    try {

        // -------------------------------------------
        // Buat URL API
        // -------------------------------------------

        const apiUrl =
            API_URL +
            "?id=" +
            encodeURIComponent(token);


        console.log(
            "Memverifikasi token:",
            token
        );


        // -------------------------------------------
        // Panggil Google Apps Script
        // -------------------------------------------

        const response =
            await fetch(
                apiUrl,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        // -------------------------------------------
        // HTTP ERROR
        // -------------------------------------------

        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        // -------------------------------------------
        // Baca JSON
        // -------------------------------------------

        const data =
            await response.json();


        console.log(
            "Data sertifikat:",
            data
        );


        // -------------------------------------------
        // VALID
        // -------------------------------------------

        if (
            data.valid === true
        ) {

            showCertificate(data);

        }


        // -------------------------------------------
        // INVALID
        // -------------------------------------------

        else {

            showInvalid(
                data.message
            );

        }


    } catch (error) {

        console.error(
            "Verifikasi gagal:",
            error
        );


        showError(
            "Sistem verifikasi tidak dapat dihubungi. Silakan coba beberapa saat lagi."
        );

    }

}


/**
 * =====================================================
 * JALANKAN OTOMATIS
 * =====================================================
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        verifyCertificate();

    }
);
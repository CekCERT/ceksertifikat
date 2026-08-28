
/**
 * =====================================================
 * SISTEM CEK SERTIFIKAT 
 * =====================================================
 *
 * MODE:
 *
 * 1. PENCARIAN MANUAL
 *    https://domain.com/
 *
 *    User memasukkan nomor:
 *    003
 *
 *    FORM PENCARIAN TETAP TAMPIL
 *    HASIL SERTIFIKAT TAMPIL
 *
 *
 * 2. QR / BARCODE
 *
 *    https://domain.com/?id=X7K92AB81M4P
 *
 *    FORM PENCARIAN DISEMBUNYIKAN
 *    HASIL SERTIFIKAT LANGSUNG TAMPIL
 *
 * =====================================================
 */


/**
 * =====================================================
 * URL GOOGLE APPS SCRIPT
 * =====================================================
 */

const API_URL =
    "https://script.google.com/macros/s/AKfycbxfTs5S3XYNl95YkjLRYzLvKhkBzdpImmtEXp0WN46qpkrVgCNZbBcOtOeIM4W9GrISqw/exec";


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
        document.getElementById(
            "loadingBox"
        );


    verifiedResult =
        document.getElementById(
            "verifiedResult"
        );


    invalidResult =
        document.getElementById(
            "invalidResult"
        );


    errorResult =
        document.getElementById(
            "errorResult"
        );


    recipientName =
        document.getElementById(
            "recipientName"
        );


    certificateProgram =
        document.getElementById(
            "certificateProgram"
        );


    certificateId =
        document.getElementById(
            "certificateId"
        );


    issuer =
        document.getElementById(
            "issuer"
        );


    tanggalMulai =
        document.getElementById(
            "tanggalMulai"
        );


    tanggalSelesai =
        document.getElementById(
            "tanggalSelesai"
        );


    issueDate =
        document.getElementById(
            "issueDate"
        );


    pejabat =
        document.getElementById(
            "pejabat"
        );

}


/**
 * =====================================================
 * TAHUN FOOTER
 * =====================================================
 */

function initYear() {

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

}


/**
 * =====================================================
 * AMBIL ID / TOKEN DARI URL
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
 * SAFE VALUE
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
 * HIDE SEMUA HASIL
 * =====================================================
 */

function hideAllResults() {

    if (loadingBox) {

        loadingBox.classList.add(
            "d-none"
        );

    }


    if (verifiedResult) {

        verifiedResult.classList.add(
            "d-none"
        );

    }


    if (invalidResult) {

        invalidResult.classList.add(
            "d-none"
        );

    }


    if (errorResult) {

        errorResult.classList.add(
            "d-none"
        );

    }

}


/**
 * =====================================================
 * TAMPILKAN LOADING
 * =====================================================
 */

function showLoading() {

    hideAllResults();


    if (loadingBox) {

        loadingBox.classList.remove(
            "d-none"
        );

    }

}


/**
 * =====================================================
 * TAMPILKAN SERTIFIKAT
 *
 * fromSearch:
 *
 * true  = pencarian manual
 * false = QR / barcode
 * =====================================================
 */

function showCertificate(
    data,
    fromSearch = false
) {

    hideAllResults();


    /**
     * ===================================================
     * TAMPILKAN HASIL
     * ===================================================
     */

    if (verifiedResult) {

        verifiedResult.classList.remove(
            "d-none"
        );

    }


    /**
     * ===================================================
     * ISI DATA
     * ===================================================
     */

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


    /**
     * ===================================================
     * FORM PENCARIAN
     * ===================================================
     *
     * MANUAL:
     * form tetap tampil
     *
     * QR:
     * form disembunyikan
     */

    const searchForm =
        document.getElementById(
            "searchForm"
        );


    if (searchForm) {

        if (fromSearch) {

            searchForm.classList.remove(
                "d-none"
            );

        } else {

            searchForm.classList.add(
                "d-none"
            );

        }

    }


    /**
     * ===================================================
     * TOMBOL KEMBALI
     * ===================================================
     *
     * Jika ada tombol #backButton:
     *
     * MANUAL → tampil
     * QR     → sembunyi
     */

    const backButton =
        document.getElementById(
            "backButton"
        );


    if (backButton) {

        if (fromSearch) {

            backButton.classList.remove(
                "d-none"
            );

        } else {

            backButton.classList.add(
                "d-none"
            );

        }

    }


    /**
     * ===================================================
     * SCROLL KE HASIL
     * ===================================================
     */

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

        invalidResult.classList.remove(
            "d-none"
        );

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

        errorResult.classList.remove(
            "d-none"
        );

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
 * CARI SERTIFIKAT DARI FORM
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


    const nomor =
        input.value
            .trim()
            .toUpperCase();


    console.log(
        "================================="
    );


    console.log(
        "PENCARIAN MANUAL"
    );


    console.log(
        "Nomor:",
        nomor
    );


    /**
     * ===================================================
     * CEK KOSONG
     * ===================================================
     */

    if (!nomor) {

        input.classList.add(
            "is-invalid"
        );

        input.focus();

        return;

    }


    input.classList.remove(
        "is-invalid"
    );


    /**
     * ===================================================
     * SIMPAN KE URL
     * ===================================================
     */

    const newURL =
        window.location.pathname +
        "?id=" +
        encodeURIComponent(
            nomor
        );


    window.history.replaceState(
        {},
        document.title,
        newURL
    );


    /**
     * ===================================================
     * TRUE = MANUAL
     * ===================================================
     */

    verifyCertificate(
        nomor,
        true
    );

}


/**
 * =====================================================
 * ENTER DI INPUT
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

            if (
                event.key === "Enter"
            ) {

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
 *
 * fromSearch:
 *
 * true  = form pencarian
 * false = QR / barcode
 * =====================================================
 */

async function verifyCertificate(
    token,
    fromSearch = false
) {

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
        "ID / TOKEN:",
        token
    );


    console.log(
        "MODE:",
        fromSearch
            ? "PENCARIAN MANUAL"
            : "QR / BARCODE"
    );


    /**
     * ===================================================
     * CEK API
     * ===================================================
     */

    if (!API_URL) {

        showError(
            "URL Google Apps Script belum tersedia."
        );

        return;

    }


    /**
     * ===================================================
     * BUAT URL API
     * ===================================================
     */

    const apiUrl =
        API_URL +
        "?id=" +
        encodeURIComponent(
            token
        );


    console.log(
        "API URL:",
        apiUrl
    );


    try {

        /**
         * ===============================================
         * FETCH
         * ===============================================
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
            "HTTP STATUS:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        /**
         * ===============================================
         * BACA RESPONSE
         * ===============================================
         */

        const text =
            await response.text();


        console.log(
            "RESPONSE MENTAH:",
            text
        );


        let data;


        try {

            data =
                JSON.parse(
                    text
                );

        } catch (jsonError) {

            console.error(
                "JSON ERROR:",
                jsonError
            );


            throw new Error(
                "Server tidak mengembalikan JSON."
            );

        }


        console.log(
            "DATA API:",
            data
        );


        /**
         * ===============================================
         * CEK VALID
         * ===============================================
         */

        const isValid =
            data.valid === true ||
            data.valid === "true";


        if (isValid) {

            showCertificate(
                data,
                fromSearch
            );


            console.log(
                "SERTIFIKAT DITEMUKAN"
            );


            return;

        }


        /**
         * ===============================================
         * FORMAT DATA LANGSUNG
         * ===============================================
         */

        if (
            data.nama ||
            data.Nama ||
            data.nomor ||
            data.nomorSertifikat
        ) {

            showCertificate(
                data,
                fromSearch
            );


            console.log(
                "SERTIFIKAT DITEMUKAN"
            );


            return;

        }


        /**
         * ===============================================
         * TIDAK DITEMUKAN
         * ===============================================
         */

        showInvalid(
            data.message ||
            data.error ||
            "Sertifikat tidak ditemukan."
        );


    } catch (error) {

        console.error(
            "================================="
        );


        console.error(
            "VERIFIKASI GAGAL:",
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

    /**
     * ===================================================
     * HAPUS PARAMETER URL
     * ===================================================
     */

    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );


    /**
     * ===================================================
     * SEMBUNYIKAN HASIL
     * ===================================================
     */

    hideAllResults();


    /**
     * ===================================================
     * TAMPILKAN FORM
     * ===================================================
     */

    const searchForm =
        document.getElementById(
            "searchForm"
        );


    if (searchForm) {

        searchForm.classList.remove(
            "d-none"
        );

    }


    /**
     * ===================================================
     * SEMBUNYIKAN TOMBOL KEMBALI
     * ===================================================
     */

    const backButton =
        document.getElementById(
            "backButton"
        );


    if (backButton) {

        backButton.classList.add(
            "d-none"
        );

    }


    /**
     * ===================================================
     * KOSONGKAN INPUT
     * =================================================== */

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


    /**
     * ===================================================
     * TAMPILKAN HERO
     * ===================================================
     */

    const heroSection =
        document.querySelector(
            ".hero-section"
        );


    if (heroSection) {

        heroSection.classList.remove(
            "d-none"
        );

    }


    /**
     * ===================================================
     * KEMBALI KE ATAS
     * ===================================================
     */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /**
     * ===================================================
     * FOKUS INPUT
     * ===================================================
     */

    setTimeout(function () {

        if (input) {

            input.focus();

        }

    }, 500);

}


/**
 * =====================================================
 * CEK URL
 *
 * Jika ada ?id=
 * berarti kemungkinan QR / BARCODE
 * =====================================================
 */

function checkURLToken() {

    const token =
        getTokenFromURL();


    if (token) {

        console.log(
            "================================="
        );


        console.log(
            "QR / BARCODE TERDETEKSI"
        );


        console.log(
            "TOKEN:",
            token
        );


        /**
         * =================================================
         * SEMBUNYIKAN FORM PENCARIAN
         * =================================================
         */

        const searchForm =
            document.getElementById(
                "searchForm"
            );


        if (searchForm) {

            searchForm.classList.add(
                "d-none"
            );

        }


        /**
         * =================================================
         * SEMBUNYIKAN TOMBOL KEMBALI
         * =================================================
         */

        const backButton =
            document.getElementById(
                "backButton"
            );


        if (backButton) {

            backButton.classList.add(
                "d-none"
            );

        }


        /**
         * =================================================
         * VERIFIKASI
         *
         * FALSE = QR / BARCODE
         * =================================================
         */

        verifyCertificate(
            token,
            false
        );


    } else {

        /**
         * =================================================
         * WEBSITE NORMAL
         * =================================================
         */

        hideAllResults();


        const searchForm =
            document.getElementById(
                "searchForm"
            );


        if (searchForm) {

            searchForm.classList.remove(
                "d-none"
            );

        }


        const backButton =
            document.getElementById(
                "backButton"
            );


        if (backButton) {

            backButton.classList.add(
                "d-none"
            );

        }

    }

}


/**
 * =====================================================
 * INITIALISASI
 * =====================================================
 */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "================================="
        );


        console.log(
            "SISTEM CEK SERTIFIKAT AKTIF"
        );


        console.log(
            "================================="
        );


        initElements();

        initYear();

        setupSearchInput();

        checkURLToken();

    }
);




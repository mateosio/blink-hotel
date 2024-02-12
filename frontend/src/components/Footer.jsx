import "../components/footer.scss";
import social from "../images/footer/socials.svg";
import phone from "../images/footer/phone.svg";
import letter from "../images/footer/letter.svg";
import location from "../images/footer/location.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <section>
        <section className="footer__section">
          <div className="footer__container_logo">
            <div className="footer__H">
              <span>H</span>
            </div>
            <div className="footer__HB">
              <span className="footer__HB-hotel">HOTEL</span>
              <span className="footer__HB-blink">BLINK</span>
            </div>
          </div>

          <div className="footer__text">
            Lorem ipsum dolor sit amet, consect etur adipisicing elit, sed doing
            eius mod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitat ion ullamco laboris nisi.
          </div>
          <div class="footer__socials">
            <img src={social} alt="iconos de redes sociales" />
          </div>
        </section>
        <div className="footer__services">
          <h2>Services.</h2>
          <div className="footer__services-list">
            <ul>
              <li>+ Resturent & Bar</li>
              <li>+ Swimming Pool</li>
              <li>+ Wellness & Spa</li>
              <li>+ Restaurant</li>
              <li>+ Conference Room</li>
              <li>+ Coctail Party House</li>
            </ul>
            <ul>
              <li>+ Gaming Zone </li>
              <li>+ Marrige Party</li>
              <li>+ Party Planning</li>
              <li>+ Tour Consultancy</li>
            </ul>
          </div>
        </div>
        <div className="footer__contact">
          <h2>Contact Us.</h2>
          <div className="footer__contact_list">
            <img src={phone} alt="icono de teléfono" />
            <div className="footer__contact_list-content">
              <h3>Phone Number</h3>
              <span>+987 876 765 76 577</span>
            </div>
          </div>
          <div className="footer__contact_list">
            <img src={letter} alt="icono de carta" />
            <div className="footer__contact_list-content">
              <h3>Phone Number</h3>
              <span>+987 876 464 61 465</span>
            </div>
          </div>
          <div className="footer__contact_list">
            <img src={location} alt="icono de locacion" />
            <div className="footer__contact_list-content">
              <h3>Phone Number</h3>
              <span>+987 876 123 59 315</span>
            </div>
          </div>
        </div>
      </section>
      <div className="footer__copyright">
        <p className="footer__copyright-by">Copyright By@Example - 2024</p>
        <p className="footer__copyright-terms">
          Terms of use | Privacy Environmental Policy
        </p>
      </div>
    </footer>
  );
}

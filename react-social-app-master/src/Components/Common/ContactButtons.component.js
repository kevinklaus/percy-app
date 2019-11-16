import React from 'react';
import Phone from '@material-ui/icons/Phone';
import Mail from '@material-ui/icons/Mail';
import Textsms from '@material-ui/icons/Textsms';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import Whatsapp from '../../Icons/Whatsapp.svg';
import whatsappDisabled from '../../Icons/WhatsappDisabled.svg';
import Typography from '@material-ui/core/Typography';

let firstName,
  lastName = 'Name';

/**
 * This component shows the icons of available communication of the contact.
 * If the communication tool is available, the color is orange.
 * If the communication tool is unavailable, it greys out.
 * By clicking on the icons, the user get redirected on the commucation tool.
 */
class ContactButtons extends React.Component {
  constructor(props) {
    super(props);
    firstName =
      this.props.contact.firstName.charAt(0).toUpperCase() +
      this.props.contact.firstName.slice(1);
    lastName =
      this.props.contact.lastName.charAt(0).toUpperCase() +
      this.props.contact.lastName.slice(1);
    this.n = this.props.contact.phone ? this.props.contact.phone[0] : null;
    if (this.n && !(this.n.startsWith('00') || this.n.startsWith('+'))) {
      this.n = '+49' + this.n.substring(1);
    }
  }

  /**
   * @memberof ContactButtons
   * This function takes the number of the contact and call the URL with the phone number
   */
  writeWhatsaAppMessage = () => {
    window.open('https://wa.me/' + this.n);
  };

  /**
   * @memberof ContactButtons
   * This function takes the phone number of the contact and uses Uniform Resource Identifier (URI) to start a phone call.
   */
  call = () => {
    window.open('tel:' + this.n);
  };

  /**
   * @memberof ContactButtons
   * This function takes the email address of the contact and uses Uniform Resource Identifier (URI) to wirte a new mail.
   */
  writeMail = () => {
    var mail = this.props.contact.email;
    window.open('mailto:' + mail);
  };
  
  /**
   * @memberof ContactButtons
   * This function takes the phone number of the contact and uses Uniform Resource Identifier (URI) to  write an SMS.
   */

  writeSMS = () => {
    var number = this.n;

    window.open('sms:' + number);
  };

  render() {
    return (
      <ButtonGroup
        variant="contained"
        color="secondary"
        size="large"
        aria-label="Large contained secondary button group"
        style={{ marginTop: 10 }}
      >
        <Button disabled={!this.n} onClick={this.writeWhatsaAppMessage}>
          <img src={!this.n ? whatsappDisabled : Whatsapp} alt="Whatsapp" />
        </Button>
        <Button disabled={!this.n} onClick={this.call}>
          <Phone />
        </Button>

        <Button onClick={this.writeMail}>
          <Mail />
        </Button>
        <Button disabled={!this.n} onClick={this.writeSMS}>
          <Textsms />
        </Button>
      </ButtonGroup>
    );
  }
}
function mapStateToProps(state) {
  return {
    contact: state.contact,
  };
}

export default connect(mapStateToProps)(ContactButtons);

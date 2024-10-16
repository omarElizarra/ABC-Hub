using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Presentacion
{
    public partial class LoginForm : Form
    {
        public LoginForm()
        {
            InitializeComponent();
        }

        [DllImport("user32.DLL", EntryPoint = "ReleaseCapture")]
        private extern static void ReleaseCapture();

        [DllImport("user32.DLL", EntryPoint = "SendMessage")]
        private extern static void SendMessage(System.IntPtr hwnd, int wmsg, int wparam, int lparam);






        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox4_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click_1(object sender, EventArgs e)
        {

        }

        private void txtUser_TextChanged(object sender, EventArgs e)
        {

        }

        private void txtPsw_TextChanged(object sender, EventArgs e)
        {
            txtPsw.UseSystemPasswordChar = true;
        }

        private void btnMin_Click(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Minimized;
        }






        private void btnAcces_Click(object sender, EventArgs e)
        {
            btnAcces.Enabled = false;
            if (txtPsw.Text != "" && txtUser.Text != "")
            {
                btnAcces.Enabled = true;


            }
        }

        private void btnAcces_Click_1(object sender, EventArgs e)
        {
            labelError.Visible = false;
            if (txtUser.Text != "" && txtPsw.Text != "")
            {
                UserModel user = new UserModel();
                var validUser = user.LoginUser(txtUser.Text, txtPsw.Text);
                if (!!validUser)
                {

                }
                else {
                    msgError("Credenciales invalidas");
                }
                // Application.Run(new Form1());
                Dashboard mv = new Dashboard();
                mv.Show();
                this.Close();

            }
            else {
                msgError("Ingrese sus credenciales");
            }

          
        }

        private void msgError(string msg) { 
            labelError.Text = msg;
            labelError.Visible = true;
        }
        private void btnClose_Click_1(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void btnMin_Click_1(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Minimized;

        }

        private void pictureBox5_Click(object sender, EventArgs e)
        {

        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void panel1_MouseDown(object sender, MouseEventArgs e)
        {
            ReleaseCapture();
            SendMessage(this.Handle, 0x112, 0xf012, 0);
        }

        private void Form1_MouseDown(object sender, MouseEventArgs e)
        {
            ReleaseCapture();
            SendMessage(this.Handle, 0x112, 0xf012, 0);

        }

        private void pictureBox1_Click_1(object sender, EventArgs e)
        {

        }

        private void txtPsw_TextChanged_1(object sender, EventArgs e)
        {

        }

        private void txtUser_TextChanged_1(object sender, EventArgs e)
        {

        }

       
    }
}

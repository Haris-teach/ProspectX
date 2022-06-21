package com.prospectx;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import io.wazo.callkeep.RNCallKeepModule;

public class MainActivity extends ReactActivity {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ProspectX";
  }

  @RequiresApi(api = Build.VERSION_CODES.S)
  @Override
  protected void onResume() {



//      PhoneAccountHandle phoneAccountHandle = new PhoneAccountHandle(new ComponentName(getApplicationContext().getPackageName(), VoiceConnectionService.class.getName()),"ProspectX");
//      TelecomManager telecomManager = (TelecomManager) getApplicationContext().getSystemService(Context.TELECOM_SERVICE);
//      PhoneAccount.Builder builder = new PhoneAccount.Builder(phoneAccountHandle, "ProspectX");
////      builder.setCapabilities(PhoneAccount.CAPABILITY_CALL_PROVIDER);
//      PhoneAccount phoneAccount = builder.build();
//      telecomManager.registerPhoneAccount(phoneAccount);



//      Intent intent=new Intent();
//      intent.setClassName("com.android.server.telecom","com.android.server.telecom.settings.EnableAccountPreferenceActivity");
//      startActivity(intent);

    super.onResume();

      requestAudioPermissions();
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
   return  new ReactActivityDelegate(this, getMainComponentName()){
      @Override
      protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
      }

      @Nullable
      @Override
      protected Bundle getLaunchOptions() {
        return super.getLaunchOptions();
      }

      @Override
      protected ReactRootView createRootView() {
        return super.createRootView();
      }
    };

  }


  @RequiresApi(api = Build.VERSION_CODES.S)
  private void requestAudioPermissions() {
    if (ContextCompat.checkSelfPermission(this,
            Manifest.permission.RECORD_AUDIO)
            != PackageManager.PERMISSION_GRANTED) {

      //When permission is not granted by user, show them message why this permission is needed.
      int MY_PERMISSIONS_RECORD_AUDIO = 1;
      if (ActivityCompat.shouldShowRequestPermissionRationale(this,
              Manifest.permission.RECORD_AUDIO)) {
//        Toast.makeText(this, "Please grant permissions to record audio", Toast.LENGTH_LONG).show();

        //Give user option to still opt-in the permissions
        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.RECORD_AUDIO},
                MY_PERMISSIONS_RECORD_AUDIO);

      } else {
        // Show user dialog to grant permission to record audio
        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.RECORD_AUDIO,Manifest.permission.BLUETOOTH_CONNECT},
                MY_PERMISSIONS_RECORD_AUDIO);
      }
    }

  }

  //Handling callback
//  @Override
//  public void onRequestPermissionsResult(int requestCode,
//                                         String[] permissions, int[] grantResults) {
//    // permission was granted, yay!
//  }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == RNCallKeepModule.REQUEST_READ_PHONE_STATE) {
            RNCallKeepModule.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }
}

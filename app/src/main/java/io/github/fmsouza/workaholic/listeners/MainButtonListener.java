package io.github.fmsouza.workaholic.listeners;

import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Calendar;

import io.github.fmsouza.workaholic.R;

/**
 * Created by fred on 20/01/15.
 */
public class MainButtonListener implements View.OnClickListener {

    private final Activity actualContext;

    public MainButtonListener(Activity context) {
        this.actualContext = context;
    }

    @Override
    public void onClick(View v) {
        Calendar arriveDate = Calendar.getInstance();
        StringBuilder arriveValue = new StringBuilder();
        arriveValue.append( arriveDate.get(Calendar.HOUR_OF_DAY) )
                   .append( "h" )
                   .append( arriveDate.get(Calendar.MINUTE) )
                   .append("min");

        TextView arriveTextView = (TextView) actualContext.findViewById(R.id.arriveValue);
        arriveTextView.setText( arriveValue.toString() );
    }

}
